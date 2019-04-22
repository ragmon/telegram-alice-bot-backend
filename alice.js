const alice = {
    ENTRYPOINT : 'http://aiproject.ru/api/',
    _client : null,

    initialize(client) {
        alice._client = client;

        return alice;
    },

    /**
     * Send message to the Alice bot.
     *
     * @param text
     */
    sendMessage(text) {
        return new Promise((resolve, reject) => {
            alice._client.post(alice.ENTRYPOINT)
                .then((response) => {
                    if (response.data.status) {
                        resolve(response.data.aiml, response.data.emotion);
                    } else {
                        console.debug(response.data.description);

                        reject(response.data.description);
                    }
                }).catch((error) => {
                    console.debug(error);

                    reject('Упс... Не удалось связаться с Алисой :(');
                });
        });
    }
};

module.exports = alice;