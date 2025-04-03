# app.py
from flask import Flask, jsonify
import psycopg2
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) 

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
    cur.execute('SELECT "ID", "Title", "Date", "Location", "Description", "Image" FROM public."Activity"')
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
            "image": row[5]
        })
    return jsonify(events)

if __name__ == '__main__':
    app.run(debug=True)
