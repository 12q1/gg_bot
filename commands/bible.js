const { bibleFetch } = require('../apicalls/bible')
const Discord = require('discord.js');
const { primaryColor } = require('../config.json')

module.exports = {
    name: 'bible',
    description: 'Gets a random bible verse.',
    execute(message, args) {
        Promise
            .all([bibleFetch()])
            .then(res => {
                const bibleEmbed = new Discord.MessageEmbed()
                    .setColor(primaryColor)
                    .setDescription(res[0])
                message.channel.send(bibleEmbed)
            })
            .catch(error => console.log(error))
    },
};