const Telegraf = require('telegraf');

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

        // bot.catch(bot.onError);

        bot.start(bot.onStart);
        bot.help(bot.onHelp);

        bot.on('text', bot.onText);

        bot.command(['exit', 'quit'], bot.onQuit);

        bot.launch();

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
        bot._alice.sendMessage(ctx.message)
            .then((answer, emotion) => {
                ctx.reply(answer);
                ctx.reply(bot._parseEmotion(emotion));
            })
            .catch((error) => ctx.reply(`\`**Ошибка:** ${error}\``))
    },

    _parseEmotion(emotion) {
        if (emotion in bot._emotions)
            return bot._emotions[emotion];
    }

};

module.exports = bot;