const Discord = require('discord.js');

module.exports = {
	name: 'ping',
	description: 'Responds pong.',
	execute(message, args) {
		const pingEmbded = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setDescription('pong')
		message.channel.send(pingEmbded);
	},
};