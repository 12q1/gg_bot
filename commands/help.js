const { prefix, primaryColor } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of commands and info.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {
            data.push('Here\'s a list of all my commands:');
            const helpEmbed = new Discord.MessageEmbed()
                .setColor(primaryColor)
                .setTitle('Commands')

            commands.map(command => {
                helpEmbed.addFields({name: prefix + command.name, value: command.description})
            })

            message.reply(helpEmbed)

            // return message.author.send(data, { split: true })
            //     .then(() => {
            //         if (message.channel.type === 'dm') return;
            //         message.reply('I\'ve sent you a DM with all my commands!');
            //     })
            //     .catch(error => {
            //         console.error(`Could not send help DM to ${message.author.tag}.\n`, error);
            //         message.reply('it seems like I can\'t DM you! Do you have DMs disabled?');
            //     });
        }
    },
};