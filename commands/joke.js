const superagent = require('superagent');
const Discord = require('discord.js');
const { primaryColor } = require('../config.json')

module.exports = {
    name: 'joke',
    description: 'Gets a random dad joke.',
    execute(message, args) {
        superagent
            .get('https://icanhazdadjoke.com/')
            .set('Accept', 'text/plain')
            .then(res => {
                const jokeEmbed = new Discord.MessageEmbed()
                    .setColor(primaryColor)
                    .setDescription(res.text)
                message.channel.send(jokeEmbed)
            })
            .catch(error => console.log(error))
    },
};