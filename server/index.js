const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to handle API requests
async function fetchAPIResponse(url) {
    try {
        const response = await axios.get(url);
        console.log('API Response:', response.data); // Log the API response
        return response.data;
    } catch (error) {
        console.error('Error fetching API response:', error);
        return null;
    }
}

// Unified API handler with fallback
app.get('/api/ask', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apis = [
        `https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(text)}`,
        `https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(text)}`,
        `https://api.siputzx.my.id/api/ai/gpt3?prompt=you%20are%20an%20helpful%20assistant%20providing%20detailed%20and%20friendly%20responses&content=${encodeURIComponent(text)}`,
        `https://api.siputzx.my.id/api/ai/mistral-7b-instruct-v0.2?content=${encodeURIComponent(text)}`
    ];

    let responseText = 'Sorry, I could not fetch a response. Please try again later.';

    for (const apiUrl of apis) {
        const data = await fetchAPIResponse(apiUrl);
        if (data && data.data) {
            responseText = data.data;
            break; // Use the first successful response
        }
    }

    res.json({ response: responseText });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
