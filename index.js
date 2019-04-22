const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const BOT_TOKEN = process.env.BOT_TOKEN || '';

const client = require('axios');
const alice = require('./alice').initialize(client);
const bot = require('./bot').initialize(BOT_TOKEN, alice);

// Welcome page
router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/pages/index.html')));

app.use(express.static(path.join(__dirname, 'public')));
app.use('/', router);

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
