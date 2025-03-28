async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        const response = await fetch(`/api/ask?text=${encodeURIComponent(userInput)}`);
        const data = await response.json();

        console.log('Backend Response:', data); // Log the backend response

        if (data.error) {
            chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.error}</div>`;
        } else {
            chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.response}</div>`;
        }
    } catch (error) {
        console.error('Frontend Error:', error); // Log the frontend error
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> Sorry, I encountered an error. Please try again.</div>`;
    }

    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
