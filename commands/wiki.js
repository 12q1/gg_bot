const Discord = require('discord.js');
const { wikipediaFetch } = require('../apicalls/wikipedia');
const { primaryColor } = require('../config.json')

module.exports = {
    name: 'wiki',
    description: 'Gets a Wikipedia article based on search keywords.',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any search keywords ${message.author}!`);
        }
        Promise
            .all([wikipediaFetch(args.join('%20'))])
            .then(res => {
                const data = Object.values(res[0].query.pages)[0]
                if (data.extract.includes(`may refer to:`)) {
                    message.channel.send(`Your search terms were too vague ${message.author} check https://en.wikipedia.org/wiki/${data.title.replace(' ', '%20')}`)
                    //TODO handle this output better, looks messy
                }
                else {
                    const wikiEmbed = new Discord.MessageEmbed()
                        .setColor(primaryColor)
                        .setTitle(data.title)
                        .setURL(`https://en.wikipedia.org/wiki/${data.title.replace(' ', '%20')}`)
                        .setDescription(`${data.extract}..`)

                    if (typeof (data.original) !== 'undefined') wikiEmbed.setImage(data.original.source)
                    //if response has an image then set the image
                    message.channel.send(wikiEmbed)
                }
            })
            .catch(error => console.log(error))
    },
};