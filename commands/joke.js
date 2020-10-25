const superagent = require('superagent');

module.exports = {
    name: 'joke',
    description: 'Joke',
    execute(message, args) {
        superagent
            .get('https://icanhazdadjoke.com/')
            .set('Accept', 'text/plain')
            .then(res => message.channel.send(res.text))
            .catch(error => console.log(error))
    },
};