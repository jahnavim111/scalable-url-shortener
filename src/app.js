const express = require('express');
const redis = require('redis');
const IdGenerator = require('./utils/idGenerator');
const { encode } = require('./utils/base62');
const trackClick = require('./middleware/analytics'); // 1. Import the middleware

const app = express();
const client = redis.createClient(); 
const generator = new IdGenerator(process.env.WORKER_ID || 1);

// Connect to Redis (Required for v4+)
client.connect().catch(console.error);

app.use(express.json());

// 1. Shorten URL
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    
    const id = generator.generate();
    const shortKey = encode(id);

    // Cache in Redis
    await client.set(shortKey, longUrl, { EX: 3600 }); 

    res.json({ shortUrl: `http://localhost:3000/${shortKey}` });
});

// 2. Redirect (Now using trackClick middleware)
app.get('/:key', trackClick, async (req, res) => {
    const key = req.params.key;

    // Try Redis Cache First
    let longUrl = await client.get(key);

    if (!longUrl) {
        return res.status(404).send('URL not found');
    }

    // The middleware already handled the "Data Analysis" logging, 
    // so this function just handles the redirect.
    res.redirect(302, longUrl); 
});

app.listen(3000, () => console.log('Server running on port 3000'));
