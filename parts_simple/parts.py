import psycopg2
from flask import Flask, request, jsonify
from flask_cors import CORS
from os import environ


app = Flask(__name__)
CORS(app)
    

# Define your database connection parameters``
conn_params = {
    'database': 'verceldb',
    'user': 'default',
    'password': 'xoi7j8hkHAra',
    'host': 'ep-snowy-frog-a1u52kl2-pooler.ap-southeast-1.aws.neon.tech',
    'port': '5432'
}

from flask import request

@app.route('/all-parts', methods=['POST'])
def fetch_all_parts():
    try:

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT * FROM parts_table ORDER BY part_id;')  # Adjust SQL query as needed
        rows = cur.fetchall()

        # Convert rows to JSON format
        post_data = [{'part_id': row[0], 'part_name': row[1], 'quantity': row[2], 'part_price': row[3], 'part_category':row[4]} for row in rows]

        cur.close()
        conn.close()

        return jsonify(post_data), 200
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500

@app.route('/parts/name', methods=['POST'])
def fetch_parts_by_name():
    try:
        data = request.json
        name = data.get('part_name', None)
        
        if name is None:
            return jsonify({'error': 'Name is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Use ILIKE for case-insensitive search
        cur.execute("SELECT * FROM parts_table WHERE part_name ILIKE %s;", ('%' + name + '%',))
        rows = cur.fetchall()

        cur.close()
        conn.close()

        if rows:
            post_data = [{'part_id': row[0], 'part_name': row[1], 'quantity': row[2], 'part_price': row[3] , 'part_category':row[4]} for row in rows]
            return jsonify(post_data), 200
        else:
            return jsonify({'error': 'No parts found for this name'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500

@app.route('/parts/price-range', methods=['POST'])
def fetch_parts_by_price_range():
    try:
        data = request.json
        min_price = data.get('min_price', None)
        max_price = data.get('max_price', None)
        
        if min_price is None or max_price is None:
            return jsonify({'error': 'Price range is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute("SELECT * FROM parts_table WHERE part_price BETWEEN %s AND %s;", (min_price, max_price,))
        rows = cur.fetchall()

        cur.close()
        conn.close()

        if rows:
            post_data = [{'partid': row[0], 'part_name': row[1], 'quantity': row[2], 'part_price': row[3], 'part_category':row[4]} for row in rows]
            return jsonify(post_data), 200
        else:
            return jsonify({'error': 'No parts found within the price range'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500
    
@app.route('/parts/category', methods=['POST'])
def fetch_parts_by_category():
    try:
        data = request.json
        category = data.get('part_category', None)
        
        if category is None:
            return jsonify({'error': 'Category is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute("SELECT * FROM parts_table WHERE LOWER(part_category) = LOWER(%s)", (category,))
        rows = cur.fetchall()

        cur.close()
        conn.close()

        if rows:
            post_data = [{'partid': row[0], 'part_name': row[1], 'quantity': row[2], 'part_price': row[3], 'part_category':row[4]} for row in rows]
            return jsonify(post_data), 200
        else:
            return jsonify({'error': 'No parts found in the specified category'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500


@app.route('/part', methods=['POST'])
def fetch_part_by_id():
    try:
        # Retrieve the part ID from the request JSON payload
        data = request.json
        part_id = data.get('part_id', None)
        
        if part_id is None:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT * FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if row:
            post_data = {'part_id': row[0], 'part_name': row[1], 'quantity': row[2], 'part_price': row[3], 'part_category':row[4]}
            return jsonify(post_data), 200
        else:
            return jsonify({'error': 'Part not found'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500
    
@app.route('/part/name', methods=['POST'])
def fetch_part_name_by_id():
    try:
        # Retrieve the part ID from the request JSON payload
        data = request.json
        part_id = data.get('part_id', None)
        
        if part_id is None:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT part_name FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if row:
            part_name = row[0]
            return jsonify({'part_name': part_name}), 200
        else:
            return jsonify({'error': 'Part not found'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500

@app.route('/part/price', methods=['POST'])
def fetch_part_price_by_id():
    try:
        # Retrieve the part ID from the request JSON payload
        data = request.json
        part_id = data.get('part_id', None)
        
        if part_id is None:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT part_price FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if row:
            part_price = row[0]
            return jsonify({'part_price': part_price}), 200
        else:
            return jsonify({'error': 'Part not found'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500

@app.route('/part/quantity', methods=['POST'])
def fetch_part_quantity_by_id():
    try:
        # Retrieve the part ID from the request JSON payload
        data = request.json
        part_id = data.get('part_id', None)
        
        if part_id is None:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT quantity FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if row:
            part_quantity = row[0]
            return jsonify({'part_quantity': part_quantity}), 200
        else:
            return jsonify({'error': 'Part not found'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500

@app.route('/part/category', methods=['POST'])
def fetch_category_by_part_id():
    try:
        # Retrieve the part ID from the request JSON payload
        data = request.json
        part_id = data.get('part_id', None)
        
        if part_id is None:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        cur.execute('SELECT part_category FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()

        cur.close()
        conn.close()

        if row:
            part_category = row[0]
            return jsonify({'part_category': part_category}), 200
        else:
            return jsonify({'error': 'Part not found'}), 404
    except psycopg2.Error as e:
        print("Error fetching data from PostgreSQL:", e)
        return jsonify({'error': 'Failed to fetch data from database'}), 500


@app.route('/part/update', methods=['PUT'])
def update_part_details():
    try:
        # Retrieve part details from the request JSON payload
        data = request.json
        part_id = data.get('part_id')
        new_part_name = data.get('part_name')
        new_quantity = data.get('quantity')
        new_part_price = data.get('part_price')
        new_part_category= data.get("part_category")
        
        if not part_id:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        # Connect to the database
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Check if the part exists
        cur.execute('SELECT * FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({'error': 'Part not found'}), 404

        # Update the part details
        update_query = """
            UPDATE parts_table 
            SET part_name = %s, quantity = %s, part_price = %s, part_category = %s
            WHERE part_id = %s;
        """
        cur.execute(update_query, (new_part_name, new_quantity, new_part_price, new_part_category, part_id))
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({'message': 'Part details updated successfully'}), 200
    except psycopg2.Error as e:
        print("Error updating part details:", e)
        return jsonify({'error': 'Failed to update part details'}), 500

@app.route('/part/delete', methods=['DELETE'])
def delete_part():
    try:
        # Retrieve part ID from the request JSON payload
        data = request.json
        part_id = data.get('part_id')
        
        if not part_id:
            return jsonify({'error': 'Part ID is missing in the request.'}), 400

        # Connect to the database
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Check if the part exists
        cur.execute('SELECT * FROM parts_table WHERE part_id = %s;', (part_id,))
        row = cur.fetchone()
        if not row:
            return jsonify({'error': 'Part not found'}), 404

        # Delete the part
        delete_query = """
            DELETE FROM parts_table 
            WHERE part_id = %s;
        """
        cur.execute(delete_query, (part_id,))
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({'message': 'Part deleted successfully'}), 200
    except psycopg2.Error as e:
        print("Error deleting part:", e)
        return jsonify({'error': 'Failed to delete part'}), 500

@app.route('/part/add', methods=['POST'])
def add_part():
    try:
        # Retrieve part details from the request JSON payload
        data = request.json
        part_id = data.get('part_id')
        part_name = data.get('part_name')
        quantity = data.get('quantity')
        part_price = data.get('part_price')
        part_category= data.get('part_category')
        
        if not part_name or not quantity or not part_price or not part_category:
            return jsonify({'error': 'Missing required fields in the request.'}), 400

        # Connect to the database
        conn = psycopg2.connect(**conn_params)
        cur = conn.cursor()

        # Check if the part ID already exists in the database
        cur.execute("SELECT EXISTS(SELECT 1 FROM parts_table WHERE part_id = %s);", (part_id,))
        part_exists = cur.fetchone()[0]
        if part_exists:
            return jsonify({'error': 'Part ID already exists in the database.'}), 400

        # Insert the new part into the database
        insert_query = """
            INSERT INTO parts_table (part_id, part_name, quantity, part_price, part_category) 
            VALUES (%s, %s, %s, %s, %s) RETURNING part_id;
        """
        cur.execute(insert_query, (part_id, part_name, quantity, part_price, part_category))
        new_part_id = cur.fetchone()[0]
        conn.commit()

        cur.close()
        conn.close()

        return jsonify({'message': 'Part added successfully', 'part_id': new_part_id}), 200
    except psycopg2.Error as e:
        print("Error adding part:", e)
        return jsonify({'error': 'Failed to add part'}), 500


if __name__ == '__main__':
    app.run(host = '0.0.0.0', port =  5000, debug = True)


