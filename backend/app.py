from flask import Flask, jsonify, request
import psycopg2
from flask_cors import CORS
import psycopg2.extras

# Create the Flask application instance
app = Flask(__name__)

# Enable CORS to allow front-end requests from localhost:5173 (Vue dev server)
CORS(app, origins=["http://localhost:5173", "http://13.236.186.198", "https://unitee.website"])

# Establish connection to the PostgreSQL database
def get_db_connection():
    return psycopg2.connect(
        host="database-2.c5sy0uckmwem.ap-southeast-2.rds.amazonaws.com",
        database="sampleDB",
        user="postgres",
        password="Lucy2001",
        port=5432
)

# Route to return all event data from the database
@app.route('/api/events')
def get_events():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Query to select all events from the Events table
        cur.execute('SELECT "id", "title", "date", "location", "description", "image", "category" FROM public."Events"')
        rows = cur.fetchall()
        cur.close()
        conn.close()

        # Convert each row to a dictionary
        events = []
        for row in rows:
            events.append({
                "id": row[0],
                "title": row[1],
                "date": row[2].strftime('%B %d, %Y'),  # Format date as a string
                "location": row[3],
                "description": row[4],
                "image": row[5],
                "category": row[6]
            })
        
        # Return all events as a JSON array
        return jsonify(events)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

# Route to return a specific event by its ID
@app.route('/api/events/<int:event_id>')
def get_event_by_id(event_id):
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Query to select an event by ID
        cur.execute(
            'SELECT "id", "title", "date", "location", "description", "image", "category" '
            'FROM public."Events" WHERE "id" = %s',
            (event_id,)
        )
        row = cur.fetchone()
        cur.close()
        conn.close()

        # If found, return event details as JSON
        if row:
            event = {
                "id": row[0],
                "title": row[1],
                "date": row[2].strftime('%B %d, %Y'),
                "location": row[3],
                "description": row[4],
                "image": row[5],
                "category": row[6]
            }
            return jsonify(event)
        else:
            # If not found, return 404 error
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500

# Route to return all service data from the database
@app.route('/api/services')
def get_services():
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        # Query to select all services from the Service table
        cur.execute('SELECT "Service Name", "Service Description", "Full Address", "contact", "email", "website", "Opening Hours", "Tram Routes", "Train Station", "latitude", "longitude" FROM public."service"')
        rows = cur.fetchall()
        cur.close()
        conn.close()

        # Convert each row to a dictionary
        services = []
        for row in rows:
            services.append({
                "Service Name": row[0],
                "Service Description": row[1],
                "Full Address": row[2],
                "Contact": row[3],
                "Email": row[4],
                "Website": row[5],
                "Opening Hours": row[6],
                "Tram Routes": row[7],
                "Train Station": row[8],
                "Latitude": row[9],
                "Longitude": row[10]
            })

        # Return all services as a JSON array
        return jsonify(services)
    except Exception as e:
        print("Error:", e)
        return jsonify({"error": str(e)}), 500
    
@app.route('/api/suburbs', methods=['GET'])
def get_suburbs():
    conn = get_db_connection()

    cursor = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    query = """
    SELECT
        pl.postcode,
        pl.locality,
        cd.chinese_high,
        cd.indian_high,
        cd.vietnamese_high,
        cd.greek_high
    FROM public."Postcode" pl
    JOIN public."Culture" cd ON pl.postcode = cd.postcode_state
    """

    cursor.execute(query)
    rows = cursor.fetchall()
    conn.close()

    result = []
    for row in rows:
        result.append({
            'postcode': row['postcode'],
            'locality': row['locality'],
            'Chinese_high': row['chinese_high'],
            'Indian_high': row['indian_high'],
            'Vietnamese_high': row['vietnamese_high'],
            'Greek_high': row['greek_high']
        })

    return jsonify(result)

@app.route('/api/features')
def get_features():
    suburb = request.args.get('suburb', '').strip()
    
    if not suburb:
        return jsonify({"error": "Suburb parameter is required."}), 400

    print(f"Querying features for suburb: {suburb}")
    
    try:
        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute('SELECT name, type FROM public."Feature" WHERE suburb_name ILIKE %s', (suburb,))

        rows = cur.fetchall()
        cur.close()
        conn.close()

        features = [{"name": row[0], "type": row[1]} for row in rows]
        return jsonify(features)
    
    except Exception as e:
        print("Error fetching features:", e)
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
