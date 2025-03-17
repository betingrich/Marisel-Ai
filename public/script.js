async function sendMessage() {
    const userInput = document.getElementById('user-input').value.trim();
    if (!userInput) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> ${userInput}</div>`;

    try {
        const response = await fetch(`/api/chat?content=${encodeURIComponent(userInput)}`);
        const data = await response.json();
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.response}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> Sorry, I encountered an error. Please try again.</div>`;
    }

    document.getElementById('user-input').value = '';
    chatBox.scrollTop = chatBox.scrollHeight;
}

async function uploadImage() {
    const fileInput = document.getElementById('image-upload');
    if (!fileInput.files[0]) return;

    const chatBox = document.getElementById('chat-box');
    chatBox.innerHTML += `<div><strong>You:</strong> Uploaded an image.</div>`;

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    try {
        const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData
        });
        const data = await response.json();
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> ${data.response}</div>`;
    } catch (error) {
        chatBox.innerHTML += `<div><strong>Marisel AI:</strong> Sorry, I couldn't process the image. Please try again.</div>`;
    }

    chatBox.scrollTop = chatBox.scrollHeight;
}

document.getElementById('image-upload').addEventListener('change', uploadImage);
