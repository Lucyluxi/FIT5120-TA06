# app.py
from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}})

conn = psycopg2.connect(
    host="database-2.c5sy0uckmwem.ap-southeast-2.rds.amazonaws.com",
    database="sampleDB",
    user="postgres",
    password="Lucy2001",
    port=5432
)

@app.route('/api/events')
def get_events():
    cur = conn.cursor()
    cur.execute('SELECT "id", "title", "date", "location", "description", "image", "category" FROM public."Events"')
    rows = cur.fetchall()
    cur.close()
    events = []
    for row in rows:
        events.append({
            "id": row[0],
            "title": row[1],
            "date": row[2].strftime('%B %d, %Y'),
            "location": row[3],
            "description": row[4],
            "image": row[5],
            "category": row[6]
        })
    return jsonify(events)

@app.route('/api/events/<int:event_id>')
def get_event_by_id(event_id):
    cur = conn.cursor()
    cur.execute(
        'SELECT "id", "title", "date", "location", "description", "image", "category" '
        'FROM public."Events" WHERE "id" = %s',
        (event_id,)
    )
    row = cur.fetchone()
    cur.close()

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
        return jsonify({"error": "Event not found"}), 404


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000)
