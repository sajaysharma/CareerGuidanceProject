from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import pickle
import numpy as np
import os
from datetime import datetime # <--- NEW Import

app = Flask(__name__)
CORS(app)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///career.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# --- DATABASE MODELS ---
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password = db.Column(db.String(100), nullable=False)
    # Relationship to history
    history = db.relationship('History', backref='user', lazy=True)

# NEW: History Table
class History(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    career_role = db.Column(db.String(100), nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)

with app.app_context():
    db.create_all()

# --- LOAD AI MODEL ---
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "career_model.pkl")

with open(MODEL_PATH, "rb") as file:
    model = pickle.load(file)

# --- CAREER ADVICE DATA ---
career_advice = {
    "Software Developer": {
        "skills": ["Python", "React", "Git", "SQL"],
        "resources": [{"name": "FreeCodeCamp", "link": "https://www.freecodecamp.org/"}]
    },
    "Data Scientist": {
        "skills": ["Python", "Statistics", "Pandas"],
        "resources": [{"name": "Kaggle", "link": "https://www.kaggle.com/"}]
    },
    "Network Engineer": {
        "skills": ["Cisco Packet Tracer", "Linux", "TCP/IP"],
        "resources": [{"name": "Cisco Networking Academy", "link": "https://www.netacad.com/"}]
    },
    "Project Manager": {
        "skills": ["Agile", "Jira", "Risk Management"],
        "resources": [{"name": "Google Project Management", "link": "https://grow.google/certificates/project-management/"}]
    },
    "UI/UX Designer": {
        "skills": ["Figma", "Adobe XD", "Color Theory"],
        "resources": [{"name": "Google UX Design", "link": "https://grow.google/certificates/ux-design/"}]
    }
}

@app.route('/')
def home():
    return "Server is running! 🚀"

@app.route('/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(email=data['email']).first():
        return jsonify({"message": "User already exists!"}), 400
    new_user = User(name=data['name'], email=data['email'], password=data['password'])
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Registration Successful!"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(email=data['email']).first()
    if user and user.password == data['password']:
        return jsonify({
            "message": "Login Successful",
            "user": {"id": user.id, "name": user.name, "email": user.email}
        }), 200
    else:
        return jsonify({"message": "Invalid Credentials"}), 401

# UPDATED: PREDICT & SAVE
@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        
        # 1. Make Prediction
        features = [float(data['cgpa']), int(data['logic']), int(data['coding']), int(data['speaking']), int(data['creativity'])]
        final_features = [np.array(features)]
        prediction = model.predict(final_features)
        role = prediction[0]
        
        # 2. Save to History (If user_id is provided)
        user_id = data.get('user_id')
        if user_id:
            new_history = History(user_id=user_id, career_role=role)
            db.session.add(new_history)
            db.session.commit()

        # 3. Get Advice
        advice = career_advice.get(role, {"skills": ["General Skills"], "resources": []})
        
        return jsonify({"prediction": role, "skills": advice["skills"], "resources": advice["resources"]})

    except Exception as e:
        return jsonify({"error": str(e)})

# NEW: GET HISTORY ROUTE
@app.route('/history/<int:user_id>', methods=['GET'])
def get_history(user_id):
    history = History.query.filter_by(user_id=user_id).order_by(History.date.desc()).all()
    results = [{"role": h.career_role, "date": h.date.strftime('%Y-%m-%d')} for h in history]
    return jsonify(results)

if __name__ == "__main__":
    app.run(debug=True, port=5000)