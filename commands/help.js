const { prefix, primaryColor } = require('../config.json');
const Discord = require('discord.js');

module.exports = {
    name: 'help',
    description: 'List all of commands and info.',
    aliases: ['commands'],
    usage: '[command name]',
    cooldown: 5,
    execute(message, args) {
        const { commands } = message.client;

        if (!args.length) {
            const helpEmbed = new Discord.MessageEmbed()
                .setColor(primaryColor)
                .setTitle('Commands')

            commands.map(command => {
                helpEmbed.addFields({name: prefix + command.name, value: command.description})
            })
            message.reply(helpEmbed)
        }
    },
};