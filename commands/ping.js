const Discord = require('discord.js');
const { primaryColor } = require('../config.json')

module.exports = {
	name: 'ping',
	description: 'Responds pong.',
	execute(message, args) {
		const pingEmbded = new Discord.MessageEmbed()
			.setColor(primaryColor)
			.setDescription('pong')
		message.channel.send(pingEmbded);
	},
};