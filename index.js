const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000;
const app = express();
const router = express.Router();
const Telegraf = require('telegraf');

const APP_URL = process.env.APP_URL || 'http://localhost:5000';
const TELEGRAM_WEBHOOK_URI = process.env.TELEGRAM_WEBHOOK_URI || '/telegram-bot-alt';
const BOT_TOKEN = process.env.BOT_TOKEN || '';

const bot = new Telegraf(BOT_TOKEN);

// Welcome page
router.get('/', (req, res) => res.sendFile(path.join(__dirname + '/views/pages/index.html')));

app.use(express.static(path.join(__dirname, 'public')));
// app.use(bot.webhookCallback(APP_URL + TELEGRAM_WEBHOOK_URI));
app.use('/', router);

// bot.telegram.setWebhook(APP_URL + TELEGRAM_WEBHOOK_URI);
//
// bot.on('text', (ctx) => {
//     ctx.reply('hello world');
// });

bot.start((ctx) => ctx.reply('hello world'));
bot.on('text', (ctx) => ctx.reply(`you say: ${ctx.message}`))
bot.launch();

app.listen(PORT, () => console.log(`Listening on ${PORT}`));

// express()
//   .use(express.static(path.join(__dirname, 'public')))
//   .get('/', (req, res) => res.render('pages/index'))
//   .listen(PORT, () => console.log(`Listening on ${ PORT }`))
