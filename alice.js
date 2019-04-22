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
     */
    sendMessage(text) {
        return new Promise((resolve, reject) => {
            const data = alice._getRequestData(text);

            console.debug('prepared request data', data);

            alice._client.post(alice.ENTRYPOINT, data)
                .then((response) => {
                    console.debug('response from Alice API', response);

                    if (response.data.status) {
                        resolve(response.data.aiml, response.data.emotion);
                    } else {
                        console.debug(response.data.description);

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
     * @returns {{query: {ask: *, userid: string}}}
     * @private
     */
    _getRequestData(message) {
        return {
            'query' : qs.stringify(JSON.stringify({
                ask : message,
                userid : 'example'
            }))
        };
    }
};

module.exports = alice;