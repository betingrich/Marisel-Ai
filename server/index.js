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

// DeepSeek-R1
app.get('/api/deepseek-r1', async (req, res) => {
    const { text } = req.query;
    if (!text) return res.status(400).json({ error: 'Please provide a question.' });

    const apiUrl = `https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(text)}`;
    const data = await fetchAPIResponse(apiUrl);

    if (!data || !data.status || !data.data) {
        console.error('API Error:', data); // Log the API error
        return res.status(500).json({ error: 'Failed to fetch response from DeepSeek-R1.' });
    }
    res.json({ response: data.data });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
