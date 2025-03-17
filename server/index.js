const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.get('/api/chat', async (req, res) => {
    const { content } = req.query;
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(content)}`);
        res.json({ response: response.data.response });
    } catch (error) {
        res.status(500).json({ response: 'Error processing your request.' });
    }
});

app.get('/api/search', async (req, res) => {
    const { content } = req.query;
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-r1?content=${encodeURIComponent(content)}`);
        res.json({ response: response.data.response });
    } catch (error) {
        res.status(500).json({ response: 'Error processing your search.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
