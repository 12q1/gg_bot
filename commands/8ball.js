const Discord = require('discord.js');
const { primaryColor } = require('../config.json')

module.exports = {
    name: '8ball',
    description: 'Gets a magic 8-ball outcome.',
    execute(message, args) {
        const outcomes = [
            "Without a doubt",
            "It is certain",
            "It is decidedly so",
            "Yes definitely",
            "You may rely on it",
            "Most likely",
            "Outlook good",
            "As I see it yes",
            "Yes",
            "Signs point to yes",
            "Very doubtful",
            "My reply is no",
            "Don't count on it",
            "Outlook not so good",
            "Better not tell you now",
            "My sources say no",
            "Ask again later",
            "Reply hazy try again",
            "Concentrate and ask again",
            "Cannot predict now"
        ]

        const ballEmbded = new Discord.MessageEmbed()
            .setColor(primaryColor)
            .setDescription(outcomes[Math.floor(Math.random() * outcomes.length)])

        message.channel.send(ballEmbded)
    },
};