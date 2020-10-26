const superagent = require('superagent');
const Discord = require('discord.js');

module.exports = {
    name: 'bible',
    description: 'Gets a random bible verse.',
    execute(message, args) {
        superagent
            .get('https://labs.bible.org/api/?passage=random')
            .then(res => {
                let fixedText = res.text.split('</b>')
                const bibleEmbed = new Discord.MessageEmbed()
                    .setColor('#0099ff')
                    .setDescription(fixedText[1] + "-" + fixedText[0].replace("<b>", " "))
                message.channel.send(bibleEmbed)
            })
            .catch(error => console.log(error))
    },
};