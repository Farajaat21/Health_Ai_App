function displayMessage(message, sender) {
    const chatContainer = document.getElementById('chat-container');
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(sender === 'user' ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatContainer.appendChild(messageDiv);
    
    chatContainer.scrollTop = chatContainer.scrollHeight;
}

function sendMessage() {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() === "") return;

    // Display user message
    displayMessage(userInput, 'user');

    // Send message to backend
    fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userInput }),
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then((data) => {
        if (data.error) {
            displayMessage("Sorry, I encountered an error. Please try again.", 'bot');
        } else {
            displayMessage(data.reply, 'bot');
        }
    })
    .catch((error) => {
        console.error("Error:", error);
        displayMessage("Sorry, I encountered an error. Please try again.", 'bot');
    });

    // Clear input field
    document.getElementById("user-input").value = "";
}

// Add event listener for Enter key
document.getElementById("user-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});