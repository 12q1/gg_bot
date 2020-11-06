const Discord = require('discord.js');
const { primaryColor } = require('../config.json')

module.exports = {
	name: 'beep',
	description: 'Responds boop.',
	execute(message, args) {
		const boopEmbded = new Discord.MessageEmbed()
			.setColor(primaryColor)
			.setDescription('boop')
			.setImage('https://top.gg/api/widget/697348519295713302.png?usernamecolor=FFFFFF&topcolor=000000')
		message.channel.send(boopEmbded);
	},
};