const Discord = require('discord.js');
const superagent = require('superagent');

module.exports = {
    name: 'wiki',
    description: 'Gets a Wikipedia article based on search keywords.',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any search keywords ${message.author}!`);
        }
        superagent
            .get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${args.join('%20')}&gsrlimit=1&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=3&exlimit=max&piprop=original`)
            .then(res => {
                return JSON.parse(res.text)
            })
            .then(res => {
                const data = Object.values(res.query.pages)[0]
                if (data.extract.includes(`may refer to:`)) {
                    message.channel.send(`Your search terms were too vague ${message.author}`)
                }
                else {
                    const wikiEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(data.title)
                        .setURL(`https://en.wikipedia.org/wiki/${data.title.replace(' ', '%20')}`)
                        .setDescription(`${data.extract}..`)

                    if (typeof(data.original) !== 'undefined') wikiEmbed.setImage(data.original.source)
                    //if response has an image then set the image
                    message.channel.send(wikiEmbed)
                }
            })
    },
};