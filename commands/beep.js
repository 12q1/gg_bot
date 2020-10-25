const Discord = require('discord.js');

module.exports = {
	name: 'beep',
	description: 'Beep',
	execute(message, args) {
		const boopEmbded = new Discord.MessageEmbed()
			.setColor('#0099ff')
			.setDescription('boop')
		message.channel.send(boopEmbded);
	},
};