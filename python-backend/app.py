from flask import Flask, request, jsonify
from database import init_db, save_entry, get_all_entries


app = Flask(__name__)
init_db()

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/entry", methods=["POST"])
def add_entry():
    data = request.get_json()
    save_entry(data["date"], data["content"], data["clean_days"])
    return jsonify({"status": "saved"})

if __name__ == "__main__":
    app.run(debug=True)

@app.route("/entries", methods=["GET"])
def get_entries():
    entries = get_all_entries()
    return jsonify(entries)