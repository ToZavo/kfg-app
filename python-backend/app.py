from flask import Flask, request, jsonify
from database import init_db, save_entry, get_all_entries
from flask_cors import CORS

app = Flask(__name__, static_folder="../public", static_url_path="")  # Allow requests from the React frontend
CORS(app, origins=["http://127.0.0.1:5500"])  # Allow requests from the React frontend  
init_db()

@app.route("/")
def home():
    return app.send_static_file("index.html")

@app.route("/entry", methods=["POST"])
def add_entry():
    data = request.get_json()
    save_entry(data["date"], data["content"], data["clean_days"])
    return jsonify({"status": "saved"})

@app.route("/entries", methods=["GET"])
def get_entries():
    entries = get_all_entries()
    return jsonify(entries)

@app.route('/api/affirmation')
def get_affirmation():
    affirmations = [
    "Look where your feet are. In spite of your best efforts you've made it this far. Keep Fucking Going!",
    "You're not defective, you're a human with weird wiring, and unfinished shit to-do.",
    "Breathe, dipshit. You don't have to solve life. It'll figure itself out.",
    "Progress counts even when it looks rough and forced.",
    "Are you having a shit day, or just a rough 5 minutes you're stretching out?",
    "There's no scoreboard, you're not behind. You're in position, growing, and still in the game.",
    "Name 5 things right now you see. That's the assignment."
    ]
    import random
    return jsonify({"affirmation": random.choice(affirmations)})

if __name__ == "__main__":
    app.run(debug=True)
