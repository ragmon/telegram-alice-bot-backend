const Telegraf = require('telegraf');
const extra = require('telegraf/extra')

const bot = {
    _bot : null,
    _alice : null,

    _emotions : {
        'smile' : '',
        'talk' : ''
    },

    initialize(token, alice) {
        bot._alice = alice;
        bot._bot = new Telegraf(token);

        bot._bot.catch(bot.onError);

        bot._bot.start(bot.onStart);
        bot._bot.help(bot.onHelp);

        bot._bot.on('text', bot.onText);

        bot._bot.command(['exit', 'quit'], bot.onQuit);

        bot._bot.launch();

        return bot;
    },

    onError(err) {
        console.error(err);
    },

    onStart(ctx) {
        ctx.reply('привет! о чём поговорим?')
    },

    onQuit(ctx) {
        ctx.reply('пока-пока!');
        ctx.leaveChat();
    },

    onHelp(ctx) {
        ctx.reply('напиши что-то мне!');
    },

    onText(ctx) {
        console.debug('received message from telegram bot', ctx.message);

        bot._alice.sendMessage(ctx.chat.text, ctx.chat.username)
            .then((answer, emotion) => {
                ctx.reply(answer + bot._parseEmotion(emotion), extra.markdown());
                ctx.reply();
            })
            .catch((error) => ctx.reply(`**Ошибка:** \`${error}\``, extra.markdown()))
    },

    _parseEmotion(emotion) {
        return emotion in bot._emotions ? bot._emotions[emotion] : '';
    }

};

module.exports = bot;