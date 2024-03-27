import requests
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
import torch.optim as optim
import dgl
from dgl.nn import GraphConv
import networkx as nx
from sklearn.metrics.pairwise import cosine_similarity
import numpy as np
from numpy.linalg import svd
import random
from scipy.cluster.hierarchy import linkage, fcluster
from flask import Flask, request, jsonify
import random
import json
from huggingface_hub import hf_hub_download

app = Flask(__name__)

def collectingPastData(url):
    try:
        response = requests.get(url)
        response.raise_for_status() 

        data = response.json()

        transformed_data = []
        for order in data.get('data', {}).get('orders', []):
            transformed_order = {
                'date': order.get('date'),
                'customer_id': order.get('customer_id'),  
                'order_item': []
            }
            
            for item in order.get('order_item', []):
                parts_info = [{'parts_id': part['parts_id'], 'parts_price': part['parts_price']} for part in item.get('parts_item', [])]
                transformed_order['order_item'].append(parts_info)
            
            transformed_data.append(transformed_order)

        return transformed_data
    except requests.HTTPError as e:
        return f'HTTP Error: {e.response.status_code}'
    except requests.RequestException as e:
        return f'Request Exception: {str(e)}'
    except Exception as e:
        return f'Error: {str(e)}'

def transformingPastData(data):
    flat_data = []
    for order in data:
        for pc in order['order_item']:
            for component in pc:
                flat_data.append({
                    'date': order['date'],
                    'customer_id': order['customer_id'],
                    'component_id': component['parts_id'],
                    'component_price': component['parts_price'] 
            })
    df = pd.DataFrame(flat_data)
    return df

def addPartCategoryToDf(df):
    url = "http://localhost:5950/all-parts"
    
    try:
        response = requests.post(url)
        response.raise_for_status()  
        
        parts_data = response.json()
        
        part_id_to_category = {part['part_id']: part['part_category'] for part in parts_data}
        
        df['part_category'] = df['component_id'].map(part_id_to_category)
        
        return parts_data, df
    
    except requests.HTTPError as http_err:
        return f'HTTP Error: {http_err}'
    except Exception as err:
        return f'Other Error: {err}'


def load_predicted_df():
    return pd.read_pickle('predicted_df.pkl')

def load_utility_matrix():
    return pd.read_pickle('utility_matrix.pkl')

def recommend_components_for_user(user_id, original_df, predicted_df, top_n=5):
    bought_components = original_df.loc[user_id][original_df.loc[user_id] > 0].index
    not_bought_components = predicted_df.loc[user_id].drop(bought_components)
    top_components = not_bought_components.sort_values(ascending=False).head(top_n).index
    return top_components

    

# GNN Workflow

class ComponentGNN(nn.Module):
    def __init__(self, in_feats, h_feats):
        super(ComponentGNN, self).__init__()
        self.conv1 = GraphConv(in_feats, h_feats, allow_zero_in_degree=True)
        self.conv2 = GraphConv(h_feats, h_feats, allow_zero_in_degree=True)

    def forward(self, g, features):
        x = F.relu(self.conv1(g, features))
        x = self.conv2(g, x)
        return x


def create_graph_from_df(df):
    G_nx = nx.Graph()
    component_to_idx = {} 
    idx_to_component = {}

    for i, component_id in enumerate(df['component_id'].unique()):
        component_id = int(component_id)  
        G_nx.add_node(component_id)
        component_to_idx[component_id] = i
        idx_to_component[i] = component_id


    for customer_id in df['customer_id'].unique():
        customer_orders = df[df['customer_id'] == customer_id]
        
        for _, order in customer_orders.groupby('date'):
            components = order['component_id'].unique()

            for i in range(len(components)):
                for j in range(i + 1, len(components)):
                    if G_nx.has_edge(components[i], components[j]):
                        G_nx[components[i]][components[j]]['weight'] += 1
                    else:
                        G_nx.add_edge(components[i], components[j], weight=1)



    G_dgl = dgl.from_networkx(G_nx)


    num_components = G_dgl.number_of_nodes()
    features = torch.eye(num_components)  
    G_dgl.ndata['feat'] = features


    return G_dgl, component_to_idx, idx_to_component

def generate_examples(G_dgl):
    pos_examples = [(u.item(), v.item()) for u, v in zip(*G_dgl.edges())]

    neg_examples = []
    while len(neg_examples) < len(pos_examples):
        u, v = random.sample(range(G_dgl.number_of_nodes()), 2)
        if not G_dgl.has_edges_between(u, v):
            neg_examples.append((u, v))
    
    return pos_examples, neg_examples


#Collecting and Processing Data Workflow
url = "http://localhost:5001/order"
data = collectingPastData(url)
df=transformingPastData(data)
parts_info, df =addPartCategoryToDf(df)



#Updating 
@app.route('/update', methods=['POST'])
def update():
    utility_matrix = df.pivot_table(index='customer_id', columns='component_id', values='date', aggfunc='count', fill_value=0)
    U, sigma, VT = svd(utility_matrix, full_matrices=False)
    sigma = np.diag(sigma)
    predicted_ratings = np.dot(np.dot(U, sigma), VT)
    predicted_df = pd.DataFrame(predicted_ratings, index=utility_matrix.index, columns=utility_matrix.columns)
    predicted_df.to_pickle('predicted_df.pkl')
    utility_matrix.to_pickle('utility_matrix.pkl')

    G_dgl, component_to_idx, idx_to_component = create_graph_from_df(df)

    pos_examples, neg_examples = generate_examples(G_dgl)

    in_feats = G_dgl.ndata['feat'].shape[1] 
    h_feats = 128  

    config = {"in_feats": in_feats, "h_feats": h_feats}

    with open('config.json', 'w') as f:
        json.dump(config, f, indent=4)

    model = ComponentGNN(in_feats=in_feats, h_feats=h_feats)

    optimizer = optim.Adam(model.parameters(), lr=0.01)

    pos_u, pos_v = zip(*pos_examples)
    neg_u, neg_v = zip(*neg_examples)
    pos_u, pos_v, neg_u, neg_v = map(torch.tensor, (pos_u, pos_v, neg_u, neg_v))

    for epoch in range(100):
        model.train()
        optimizer.zero_grad()
            
        logits = model(G_dgl, G_dgl.ndata['feat']) 
            

        pos_score = (logits[pos_u] * logits[pos_v]).sum(dim=1)
        neg_score = (logits[neg_u] * logits[neg_v]).sum(dim=1)
            
        scores = torch.cat([pos_score, neg_score])
        labels = torch.cat([torch.ones_like(pos_score), torch.zeros_like(neg_score)])
            
        loss = F.binary_cross_entropy_with_logits(scores, labels)
            
        loss.backward()
        optimizer.step()

            
        print(f'Epoch {epoch}: Loss {loss.item()}')
    

    torch.save(model.state_dict(), 'esd_gnn/model_gnn.pth')
    dgl.save_graphs('graph_data.bin', [G_dgl])
    with open('component_to_idx.json', 'w') as f:
        json.dump(component_to_idx, f)


def load_model(model_id, filename):
    model_path = hf_hub_download(repo_id=model_id, filename=filename)
    config_path = hf_hub_download(repo_id=model_id, filename="config.json")
    with open(config_path, 'r') as config_file:
        config = json.load(config_file)
    model = ComponentGNN(in_feats=config['in_feats'], h_feats=config['h_feats'])
    model.load_state_dict(torch.load(model_path, map_location=torch.device('cpu')))
    model.eval()
    return model
    


@app.before_request
def load_data():
    app.before_request_funcs[None].remove(load_data)
    global model, G_dgl, component_to_idx

    model_id = "clarissaksq/esd_gnn"
    filename = "model_gnn.pth"
    model = load_model(model_id, filename)  
    
    G_dgl_list = dgl.load_graphs('graph_data.bin')
    G_dgl = G_dgl_list[0][0]  
    
    with open('component_to_idx.json', 'r') as f:
        component_to_idx = json.load(f)

@app.route('/retrieve-recommended-products', methods=['POST'])
def recommend():
    data = request.json
    user_id = data.get('user_id')

    if not user_id:
        return jsonify({'error': 'User ID is required.'}), 400

    try:
        predicted_df = load_predicted_df()
        utility_matrix = load_utility_matrix()
        recommendations = recommend_components_for_user(user_id, utility_matrix, predicted_df, top_n=10)
        features = G_dgl.ndata['feat']
        embeddings = model(G_dgl, features)
        embeddings = embeddings.detach().cpu().numpy()

        cos_sim_matrix = cosine_similarity(embeddings)

        user_components_df = recommendations
        input_components = user_components_df['component_id'].unique().tolist()

        input_embeddings = np.array([embeddings[component_to_idx[c]] for c in input_components if c in component_to_idx])

        sim_matrix = cosine_similarity(input_embeddings)
        distance_matrix = 1 - sim_matrix
        np.fill_diagonal(distance_matrix, 0)  
        linked = linkage(distance_matrix, 'single')

        clusters = fcluster(linked, t=1.5, criterion='distance')

        clustered_components = {i: [] for i in range(1, max(clusters)+1)}
        for idx, cluster_id in enumerate(clusters):
            if input_components[idx] in component_to_idx:  
                clustered_components[cluster_id].append(input_components[idx])

        for cluster_id, components in clustered_components.items():
            if len(components) > 1: 
                print(f"Cluster {cluster_id}: Often bought together components: {components}")
            else:
                print(f"Cluster {cluster_id}: Component {components} is less frequently bought with others or is an anomaly.")

        largest_cluster = max(clustered_components.keys(), key=lambda k: len(clustered_components[k]))

        required_categories = ["CPU", "GPU", "RAM", "Storage", "Motherboard", "Power Supply", "Case", "Peripheral", "Monitor"]
        selected_parts = []
        missing_categories = required_categories[:]

        parts_in_cluster = [part for part in parts_info if part["part_id"] in clustered_components[largest_cluster]]

        for category in required_categories:
            parts_in_category = [part for part in parts_in_cluster if part["part_category"] == category]
            
            if parts_in_category:
                selected_part = parts_in_category[0]
                selected_parts.append(selected_part)
                missing_categories.remove(category) 
        


        for category in missing_categories:
            parts_in_missing_category = [part for part in parts_info if part["part_category"] == category]
            
            if parts_in_missing_category:
                selected_part = random.choice(parts_in_missing_category)
                selected_parts.append(selected_part)
            else:
                print(f"No available parts found for category {category}. It remains missing.")


    except Exception as e:
        return jsonify({'error': 'An error occurred processing your request.'}), 500




if __name__ == '__main__':
    app.run(debug=True, port=5800)