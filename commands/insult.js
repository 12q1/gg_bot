const superagent = require('superagent');

module.exports = {
    name: 'insult',
    description: 'Insult',
    execute(message, args) {
        if (!args.length) { //if there are no keywords then we just get an insult directed at you
            superagent
                .get('https://insult.mattbas.org/api/insult.txt')
                .then(res => message.channel.send(res.text))
                .catch(error => console.log(error))
        }
        else { //otherwise we use the insultee's name
            url = `https://insult.mattbas.org/api/insult.txt?who=${args.join('+')}`
            superagent
                .get(url)
                .then(res => message.channel.send(res.text))
                .catch(error => console.log(error))
        }
    },
};