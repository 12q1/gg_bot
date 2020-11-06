const superagent = require('superagent');
const Discord = require('discord.js');
const { primaryColor } = require('../config.json');
const { insultFetch } = require('../apicalls/insult');

module.exports = {
    name: 'insult',
    description: 'Gets a randomly generated insult or returns an insult based on keywords.',
    usage: "!insult || !insult <victim's name>",
    execute(message, args) {
        //console.log(args)
        Promise
            .all([insultFetch(args.join('+'))])
            .then(res => {
                const insultEmbed = new Discord.MessageEmbed()
                    .setColor(primaryColor)
                    .setDescription(res[0])
                message.channel.send(insultEmbed)
            })
            .catch(error => console.log(error))
    },
};