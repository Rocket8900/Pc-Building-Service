import psycopg2
from flask import Flask, jsonify, request
from flask_cors import CORS


app = Flask(__name__)
CORS(app)

# Define your database connection parameters
conn_params = {
    'database': 'verceldb',
    'user': 'default',
    'password': 'xoi7j8hkHAra',
    'host': 'ep-snowy-frog-a1u52kl2-pooler.ap-southeast-1.aws.neon.tech',
    'port': '5432'
}

def fetch_all_posts():
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT * FROM parts_table ORDER BY partid;')  # Adjust SQL query as needed
        rows = cur.fetchall()

        # Convert rows to JSON format
        post_data = [{'partid': row[0], 'name': row[1], 'category': row[2], 'quantity': row[3], 'price': row[4]} for row in rows]

        cur.close()
        conn.close()

        return post_data
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return []

def fetch_post_by_id(partid):
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT * FROM parts_table WHERE partid = %s;', (partid,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if row:
            post_data = [{'partid': row[0], 'name': row[1], 'category': row[2], 'quantity': row[3], 'price': row[4]}]
            return post_data
        else:
            return {'error': 'Part not found'}
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return {'error': 'Failed to fetch data from database'}
    
def fetch_posts_by_category(category):
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT * FROM parts_table WHERE category ILIKE %s;', (category,))
        rows = cur.fetchall()
        
        cur.close()
        conn.close()

        if rows:
            posts_data = [{'partid': row[0], 'name': row[1], 'category': row[2], 'quantity': row[3], 'price': row[4]} for row in rows]
            return posts_data
        
        else:
            return {'error': 'No parts found for this category'}
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return {'error': 'Failed to fetch data from database'}

def fetch_post_by_name(name):
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

    
        # Use ILIKE for case-insensitive search
        cur.execute("SELECT * FROM parts_table WHERE name ILIKE %s;", ('%' + name + '%',))
        rows = cur.fetchall()

        cur.close()
        conn.close()

        if rows:
            post_data = [{'partid': row[0], 'name': row[1], 'category': row[2], 'quantity': row[3], 'price': row[4]} for row in rows]
            return post_data
        else:
            return {'error': 'No parts found for this name'}
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return {'error': 'Failed to fetch data from database'}

def fetch_posts_by_price_range(min_price, max_price):
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute("SELECT * FROM parts_table WHERE price BETWEEN %s AND %s;", (min_price, max_price,))
        rows = cur.fetchall()

        cur.close()
        conn.close()

        if rows:
            post_data = [{'partid': row[0], 'name': row[1], 'category': row[2], 'quantity': row[3], 'price': row[4]} for row in rows]
            return post_data
        else:
            return {'error': 'No parts found within the price range'}
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return {'error': 'Failed to fetch data from database'}

def update_post(name, category, quantity, price, partid):
    try:
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('UPDATE parts_table SET name=%s, category=%s, quantity=%s, price=%s WHERE partid=%s;',
                    (name, category, quantity, price, partid))
        conn.commit()

        # Order the rows by partid after updating
        cur.execute('SELECT * FROM parts_table ORDER BY partid;')
        rows = cur.fetchall()

        cur.close()
        conn.close()

        return rows
    except psycopg2.Error as e:
        print("Error updating data in PostgreSQL:", e)
        return None

@app.route('/parts', methods=['GET'])
def get_posts():
    post_data = fetch_all_posts()
    return jsonify(post_data)

@app.route('/parts/<int:partid>', methods=['GET'])
def get_post_by_id(partid):
    post_data = fetch_post_by_id(partid)
    return jsonify(post_data)
    
@app.route('/parts/category/<string:category>', methods=['GET'])    
def get_posts_by_category(category): 
    post_data = fetch_posts_by_category(category)
    return jsonify(post_data)

@app.route('/parts/name/<string:name>', methods=['GET'])
def get_posts_by_name(name):
    post_data = fetch_post_by_name(name)
    return jsonify(post_data)

@app.route('/parts/price/<int:min_price>/<int:max_price>', methods=['GET'])
@app.route('/parts/price/<float:min_price>/<float:max_price>', methods=['GET'])
def get_posts_by_price_range(min_price, max_price):
    post_data = fetch_posts_by_price_range(min_price, max_price)
    return jsonify(post_data)

@app.route('/parts/<int:partid>', methods=['PUT'])
def update_existing_post(partid):
    data = request.json
    
    # Extract data from request
    name = data.get('name')
    category = data.get('category')
    quantity = data.get('quantity')
    price = data.get('price')

    # Check if all required fields are present
    if not (name and category and quantity and price):
        return jsonify({'error': 'Missing required fields'}), 400

    # Update the post in the database
    updated_rows = update_post(name, category, quantity, price, partid)
    
    if updated_rows is not None:
        return jsonify({'success': 'Post updated successfully', 'updated_rows': updated_rows}), 200
    else:
        return jsonify({'error': 'Failed to update post'}), 500

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port =  5000, debug = True)

