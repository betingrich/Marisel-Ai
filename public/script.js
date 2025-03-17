async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    const apiSelector = document.getElementById('api-select').value;

    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        const response = await fetch(`/api/${apiSelector}?text=${encodeURIComponent(userInput)}`);
        const data = await response.json();

        if (data.error) {
            chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.error}</div>`;
        } else {
            chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.response}</div>`;
        }
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> Sorry, I encountered an error. Please try again.</div>`;
    }

    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
