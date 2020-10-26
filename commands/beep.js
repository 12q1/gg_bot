const Discord = require('discord.js');
const { primaryColor } = require('../config.json')

module.exports = {
	name: 'beep',
	description: 'Responds boop.',
	execute(message, args) {
		const boopEmbded = new Discord.MessageEmbed()
			.setColor(primaryColor)
			.setDescription('boop')
		message.channel.send(boopEmbded);
	},
};