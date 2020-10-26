require('dotenv').config();
const Discord = require('discord.js');
const superagent = require('superagent');
const omdbkey = process.env.OMDBKEY;

module.exports = {
    name: 'imdb',
    description: 'Searches for movie info.',
    aliases: ['movie'],
    execute(message, args) {
        if (!args.length) {
            message.channel.send("You didn't provide any arguments")
        }
        else {
            const url = `http://www.omdbapi.com/?t=${args.join("+")}&apikey=${omdbkey}`;
            superagent
                .get(url)
                .then(res => {
                    if (res.body.Response === 'True') {
                        const imdbEmbed = new Discord.MessageEmbed()
                            .setColor('#0099ff')
                            .setTitle(`${res.body.Title} (${res.body.Year})`)
                            .setImage(res.body.Poster)
                            .setDescription(res.body.Plot)
                            .setURL(`https://www.imdb.com/title/${res.body.imdbID}`)
                            .addFields(
                                { name: 'Metascore:', value: res.body.Metascore, inline: true },
                                { name: 'IMDB Rating:', value: res.body.imdbRating, inline: true },
                                { name: 'Rotten Tomatoes:', value: res.body.Ratings[1].Value, inline: true },
                            )
                        message.channel.send(imdbEmbed)
                    }
                    else {
                        message.channel.send("I couldn't find that movie")
                    }
                })
                .catch(error => console.log(error))
        }
    },
};