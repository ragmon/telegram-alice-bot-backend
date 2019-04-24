// const qs = require('qs');
const qs = require('querystring');

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
     * @param userId
     */
    sendMessage(text, userId) {
        return new Promise((resolve, reject) => {
            const data = alice._getRequestData(text, userId);

            console.debug('prepared request data', data);

            alice._client.post(alice.ENTRYPOINT, data)
                .then((response) => {
                    // console.debug('response from Alice API', response);

                    if (response.data.status) {
                        // console.debug('response from bot', response.data);

                        resolve(response.data.aiml, response.data.emotion);
                    } else {
                        // console.debug(response.data.description);

                        reject(response.data.description);
                    }
                }).catch((error) => {
                    console.error(error);

                    reject('Упс... Не удалось связаться с Алисой :(');
                });
        });
    },

    /**
     * Prepare post request data.
     *
     * @param message
     * @param userId
     * @returns {{query: {ask: *, userid: string}}}
     * @private
     */
    _getRequestData(message, userId) {
        return qs.stringify({
            'query' : JSON.stringify({
                'ask' : message,
                'userid' : userId
            })
        });
    }
};

module.exports = alice;