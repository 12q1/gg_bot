require('dotenv').config();
const Discord = require('discord.js');
const superagent = require('superagent');
const omdbkey = process.env.OMDBKEY;

module.exports = {
    name: 'imdb',
    description: 'imdb',
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
                    const imdbEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle(`${res.body.Title} (${res.body.Year})`)
                        .setImage(res.body.Poster)
                        .setURL(`https://www.imdb.com/title/${res.body.imdbID}`)
                        .addFields(
                            { name: 'Plot', value: res.body.Plot },
                            { name: 'Metascore', value: res.body.Metascore, inline: true},
                            { name: 'IMDB Rating', value: res.body.imdbRating, inline: true},
                            { name: 'Rotten Tomatoes', value: res.body.Ratings[1].Value, inline: true},
                        )
                    message.channel.send(imdbEmbed)
                })
                .catch(error => console.log(error))
        }
    },
};