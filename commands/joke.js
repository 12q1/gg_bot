const Discord = require('discord.js');
const { primaryColor } = require('../config.json');
const { iCanHasDadJokeFetch } = require('../apicalls/icanhazdadjoke');

module.exports = {
    name: 'joke',
    description: 'Gets a random dad joke.',
    execute(message, args) {
        Promise
            .all([iCanHasDadJokeFetch()])
            .then(res => {
                const jokeEmbed = new Discord.MessageEmbed()
                    .setColor(primaryColor)
                    .setDescription(res[0])
                message.channel.send(jokeEmbed)
            })
            .catch(error => console.log(error))
    },
};