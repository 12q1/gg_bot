const superagent = require('superagent');
const Discord = require('discord.js');

module.exports = {
    name: 'advice',
    description: 'Get a random piece of advice.',
    execute(message, args) {
        superagent
            .get('https://api.adviceslip.com/advice')
            .then(res => {
                const data =JSON.parse(res.text)
                const adviceEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(data.slip.advice)
                message.channel.send(adviceEmbed)
            })
            .catch(error => console.log(error))
    },
};