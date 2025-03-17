async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        const response = await fetch(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(userInput)}`);
        const data = await response.json();
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.response}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> Sorry, I encountered an error. Please try again.</div>`;
    }

    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function performSearch() {
    const searchInput = document.getElementById('search-input').value.trim();
    if (!searchInput) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> Searched for "${searchInput}".</div>`;

    try {
        const response = await fetch(`https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(searchInput)}`);
        const data = await response.json();
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.response}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> Sorry, I couldn't perform the search. Please try again.</div>`;
    }

    document.getElementById('search-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}
