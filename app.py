from flask import Flask, render_template, request, jsonify
from dotenv import load_dotenv
import os
import google.generativeai as genai

# Load .env file
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Create model once (reuse for all requests)
model = genai.GenerativeModel("gemini-2.5-flash")

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/chat", methods=["POST"])
def chat():
    user_message = request.json.get("message")
    if not user_message:
        return jsonify({"response": "Please type something."}), 400

    # Generate response from Gemini
    response = model.generate_content(user_message)
    bot_response = response.text or "I couldn't generate a response."

    return jsonify({"response": bot_response})

if __name__ == "__main__":
    app.run(debug=True)
