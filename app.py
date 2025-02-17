from flask import Flask, request, jsonify
from flask_cors import CORS
import openai

app = Flask(__name__)

# Enable CORS for the frontend to communicate with the backend
CORS(app)

@app.route('/')
def home():
    return "API is working!"

@app.route('/chat', methods=['POST'])
def chat():
    try:
        user_message = request.json.get('message')
        print(f"Received message: {user_message}")

        # Use the new OpenAI API interface
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",  # Use gpt-3.5-turbo or any other available model
            messages=[
                {"role": "system", "content": "You are a helpful assistant."},
                {"role": "user", "content": user_message},
            ]
        )

        reply = response.choices[0].message['content']
        return jsonify({"reply": reply})
    
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "An error occurred. Please try again."}), 500

if __name__ == '__main__':
    app.run(debug=True)