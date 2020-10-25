require('dotenv').config();
const superagent = require('superagent');
const giphykey = process.env.GIPHYKEY;

module.exports = {
    name: 'gif',
    description: 'gif',
    execute(message, args) {
        if (!args.length) { //if there are no keywords then we just get a random gif
            url = `https://api.giphy.com/v1/gifs/random?api_key=${giphykey}&tag=funny&rating=r`;

            superagent
                .get(url)
                .then(res => message.channel.send(res.body.data.image_url))
                .catch(error => console.log(error))
        }
        else { //otherwise we use the giphy translate feature to get a reaction gif
            url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphykey}&s=${args.join(' ')}`

            superagent
                .get(url)
                .then(res => message.channel.send(res.body.data.url))
                .catch(error => console.log(error))
        }
    },
};