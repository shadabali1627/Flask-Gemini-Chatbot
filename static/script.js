async function sendMessage() {
    const userInput = document.getElementById("user-input");
    const chatBox = document.getElementById("chat-box");

    const userMessage = userInput.value.trim();
    if (!userMessage) return;

    // Show user message
    chatBox.innerHTML += `<div class="user-msg"><b>You:</b> ${userMessage}</div>`;
    userInput.value = "";

    // Show "Bot is typing..."
    const typingMsg = document.createElement("div");
    typingMsg.classList.add("bot-msg");
    typingMsg.innerHTML = "<i>Bot is typing...</i>";
    chatBox.appendChild(typingMsg);
    chatBox.scrollTop = chatBox.scrollHeight;

    try {
        // Send to backend
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: userMessage })
        });

        const data = await response.json();

        // Replace "typing" with bot response
        typingMsg.innerHTML = `<b>Bot:</b> ${data.response}`;
    } catch (error) {
        typingMsg.innerHTML = "<b>Bot:</b> Sorry, something went wrong.";
        console.error("Error:", error);
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}
