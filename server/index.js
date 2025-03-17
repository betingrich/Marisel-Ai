const express = require('express');
const cors = require('cors');
const axios = require('axios');
const multer = require('multer');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

app.get('/api/chat', async (req, res) => {
    const { content } = req.query;
    try {
        const response = await axios.get(`https://api.siputzx.my.id/api/ai/deepseek-llm-67b-chat?content=${encodeURIComponent(content)}`);
        res.json({ response: response.data.response });
    } catch (error) {
        res.status(500).json({ response: 'Error processing your request.' });
    }
});

app.post('/api/upload', upload.single('image'), async (req, res) => {
    try {
        // Process the image here (e.g., send it to an image analysis API)
        res.json({ response: 'Image processed successfully.' });
    } catch (error) {
        res.status(500).json({ response: 'Error processing the image.' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
