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
        return response.data;
    } catch (error) {
        console.error('Error fetching API response:', error);
        return null;
    }
}

// Jinwoo AI
app.get('/api/jinwoo', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apiUrl = `https://api.siputzx.my.id/api/ai/blackboxai?content=${encodeURIComponent(text)}`;
    const data = await fetchAPIResponse(apiUrl);

    if (!data || !data.status || !data.data) {
        return res.status(500).json({ error: 'Failed to fetch response from Jinwoo AI.' });
    }
    res.json({ response: data.data });
});

// DeepSeek-R1
app.get('/api/deepseek-r1', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apiUrl = `https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(text)}`;
    const data = await fetchAPIResponse(apiUrl);

    if (!data || !data.status || !data.data) {
        return res.status(500).json({ error: 'Failed to fetch response from DeepSeek-R1.' });
    }
    res.json({ response: data.data });
});

// DeepSeek-LLM
app.get('/api/deepseek-llm', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apiUrl = `https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(text)}`;
    const data = await fetchAPIResponse(apiUrl);

    if (!data || !data.status || !data.data) {
        return res.status(500).json({ error: 'Failed to fetch response from DeepSeek-LLM.' });
    }
    res.json({ response: data.data });
});

// GPT-3
app.get('/api/gpt', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apiUrl = `https://api.siputzx.my.id/api/ai/gpt3?prompt=you%20are%20an%20helpful%20assistant%20providing%20detailed%20and%20friendly%20responses&content=${encodeURIComponent(text)}`;
    const data = await fetchAPIResponse(apiUrl);

    if (!data || !data.status || !data.data) {
        return res.status(500).json({ error: 'Failed to fetch response from GPT-3.' });
    }
    res.json({ response: data.data });
});

// Mistral
app.get('/api/mistral', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apiUrl = `https://api.siputzx.my.id/api/ai/mistral-7b-instruct-v0.2?content=${encodeURIComponent(text)}`;
    const data = await fetchAPIResponse(apiUrl);

    if (!data || !data.status || !data.data) {
        return res.status(500).json({ error: 'Failed to fetch response from Mistral.' });
    }
    res.json({ response: data.data });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
