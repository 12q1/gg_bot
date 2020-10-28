const Discord = require('discord.js');
const { tasteDiveFetch } = require('../apicalls/tastedive');
const { primaryColor } = require('../config.json')

module.exports = {
    name: 'suggest',
    description: 'Recommends similar media based on search terms.',
    execute(message, args) {
        if (!args.length) return message.channel.send(`You didn't provide any search keywords ${message.author}!`);
        Promise
            .all([tasteDiveFetch(args.join("+"), 15)])
            .then(res => {
                if (res[0].length === 0) return message.channel.send(`I couldn't find any matches ${message.author}`)
                const suggestEmbded = new Discord.MessageEmbed()
                    .setColor(primaryColor)
                    .setTitle('Suggestions:')
                    .setFooter('Powered by TasteDive')
                res[0].map(media => {
                    let resultString = '';
                    if (media.wUrl !== null) resultString += `[Wiki](${media.wUrl}) `
                    if (media.yID !== null) resultString += `- [YouTube](https://www.youtube.com/watch?v=${media.yID})`
                    if(resultString.length === 0) resultString = 'No links found'
                    suggestEmbded.addFields({ name: media.Name, value: resultString})
                })
                message.channel.send(suggestEmbded);
            })
            .catch(error => console.log(error))
    },
};