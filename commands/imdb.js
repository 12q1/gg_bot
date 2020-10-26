const { primaryColor } = require('../config.json')
const Discord = require('discord.js');
const { omdbFetch } = require('../apicalls/omdb');
const { tasteDiveFetch } = require('../apicalls/tastedive');
//const { trailerAddictFetch } = require('../apicalls/traileraddict');

module.exports = {
    name: 'imdb',
    description: 'Searches for movie info.',
    aliases: ['movie'],
    execute(message, args) {
        if (!args.length) {
            message.channel.send("You didn't provide any arguments")
        }
        else {
            Promise
                .all([
                    omdbFetch(args.join("+")),
                    tasteDiveFetch(args.join("+")),
                    //trailerAddictFetch(args.join("-"))
                ])
                .then(res => {
                    const omdbData = res[0]
                    const tasteDiveData = res[1]
                    if(res[0].Response === 'False') return message.channel.send("I couldn't find that movie")
                    const imdbEmbed = new Discord.MessageEmbed()
                        .setColor(primaryColor)
                        .setTitle(`${omdbData.Title} (${omdbData.Year})`)
                        .setDescription(omdbData.Plot)
                        .setURL(`https://www.imdb.com/title/${omdbData.imdbID}`)
                        .setThumbnail(omdbData.Poster)
                        .addFields(
                            { name: 'Metascore:', value: omdbData.Metascore, inline: true },
                            { name: 'IMDB Rating:', value: omdbData.imdbRating, inline: true },
                            { name: 'Rotten Tomatoes:', value: omdbData.Ratings[1].Value, inline: true },
                            { name: 'Similar Movies:', value: tasteDiveData.map(suggestion => suggestion.Name).join(',\n')},
                        )
                        .setFooter('Powered by OMDB & TasteDive')
                    message.channel.send(imdbEmbed)
                })
                .catch(error => console.log(error))
        }
    },
};