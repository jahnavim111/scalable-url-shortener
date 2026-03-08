const express = require('express');
const redis = require('redis');
const IdGenerator = require('./utils/idGenerator');
const { encode } = require('./utils/base62');

const app = express();
const client = redis.createClient(); // Assumes Redis is running locally
const generator = new IdGenerator(process.env.WORKER_ID || 1);

app.use(express.json());

// 1. Shorten URL
app.post('/shorten', async (req, res) => {
    const { longUrl } = req.body;
    
    // Generate unique ID and encode it
    const id = generator.generate();
    const shortKey = encode(id);

    // Save to Database (Mocking SQL call) and Cache in Redis
    // await db.save(shortKey, longUrl);
    await client.set(shortKey, longUrl, { EX: 3600 }); // Cache for 1 hour

    res.json({ shortUrl: `http://localhost:3000/${shortKey}` });
});

// 2. Redirect (The "Click Tracking" logic)
app.get('/:key', async (req, res) => {
    const key = req.params.key;

    // Try Redis Cache First
    let longUrl = await client.get(key);

    if (!longUrl) {
        // Cache Miss -> Check DB (Logic not shown)
        // longUrl = await db.find(key);
        return res.status(404).send('URL not found');
    }

    // DATA ANALYSIS: Log click asynchronously
    console.log(`Click tracked for ${key} at ${new Date().toISOString()}`);

    res.redirect(302, longUrl); // Temporary redirect for analytics
});

app.listen(3000, () => console.log('Server running on port 3000'));
