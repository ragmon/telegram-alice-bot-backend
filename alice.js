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
                        console.debug('response from bot', response.data);

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
        return qs.stringify({
            'query' : JSON.stringify({
                'ask' : 'привет',
                'userid' : 'example'
            })
        });
        // return qs.stringify({
        //     // 'query' : qs.stringify('{"ask":"как дела?","userid":"example"}')
        //     'query' : JSON.stringify({
        //         'ask' : 'привет',
        //         'userid' : 'example'
        //     })
        // });
        // return qs.stringify({
        //     query : {
        //         ask : 'привет',
        //         userid : 'example'
        //     }
        // }, { encodeValuesOnly: true });
        // return {
        //     'query' : qs.stringify({
        //         ask : message,
        //         userid : 'example'
        //     })
        // };
    }
};

module.exports = alice;