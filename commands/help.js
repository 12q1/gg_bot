const { prefix, primaryColor } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of commands and usage info.',
    aliases: ['commands'],
    cooldown: 5,
    execute(message, args) {
        const { commands } = message.client;
        if (!args.length) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor(primaryColor)
                .setTitle('Available Commands')

            commands.map(command => {
                let explainString = command.description
                if(command.usage) explainString += `\n\`\`\` ${command.usage}\`\`\``
                helpEmbed.addFields({name: prefix + command.name, value: explainString})
            })
            message.reply(helpEmbed)
        }
    },
};