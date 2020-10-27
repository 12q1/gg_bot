const Discord = require('discord.js');
const { primaryColor } = require('../config.json');
const { adviceFetch } = require('../apicalls/adviceslip');

module.exports = {
    name: 'advice',
    description: 'Get a random piece of advice.',
    execute(message, args) {
        Promise
            .all([adviceFetch()])
            .then(res => {
                const adviceEmbed = new Discord.MessageEmbed()
                    .setColor(primaryColor)
                    .setDescription(res[0])
                message.channel.send(adviceEmbed)
            })
            .catch(error => console.log(error))
    },
};