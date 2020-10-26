const superagent = require('superagent');
const Discord = require('discord.js');

module.exports = {
    name: 'insult',
    description: 'Gets a randomly generated insult or returns an insult based on keywords.',
    execute(message, args) {
        const insultEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
        if (!args.length) { //if there are no keywords then we just get an insult directed at you
            superagent
                .get('https://insult.mattbas.org/api/insult.txt')
                .then(res => {
                    insultEmbed.setDescription(res.text)
                    message.channel.send(insultEmbed)
                })
                .catch(error => console.log(error))
        }
        else { //otherwise we use the insultee's name
            url = `https://insult.mattbas.org/api/insult.txt?who=${args.join('+')}`
            superagent
                .get(url)
                .then(res => {
                    insultEmbed.setDescription(res.text)
                    message.channel.send(insultEmbed)
                })
                .catch(error => console.log(error))
        }
    },
};