const superagent = require('superagent');
const Discord = require('discord.js');

module.exports = {
    name: 'joke',
    description: 'Joke',
    execute(message, args) {
        superagent
            .get('https://icanhazdadjoke.com/')
            .set('Accept', 'text/plain')
            .then(res => {
                const jokeEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(res.text)
                message.channel.send(jokeEmbed)
            })
            .catch(error => console.log(error))
    },
};