require('dotenv').config();
const superagent = require('superagent');
const omdbkey = process.env.OMDBKEY;

module.exports = {
    name: 'imdb',
    description: 'imdb',
    execute(message, args) {
        if (!args.length) {
            message.channel.send("You didn't provide any arguments")
        }
        else {
            const url = `http://www.omdbapi.com/?t=${args.join("+")}&apikey=${omdbkey}`;
            superagent
                .get(url)
                .then(res => message.channel.send(`**${res.body.Title}:** https://www.imdb.com/title/${res.body.imdbID} \n**Metascore:** ${res.body.Metascore}\n**IMDB:** ${res.body.imdbRating}\n**Rotten Tomatoes:** ${res.body.Ratings[1].Value}`))
                .catch(error => console.log(error))
        }
    },
};