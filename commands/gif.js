require('dotenv').config();
const superagent = require('superagent');
const giphykey = process.env.GIPHYKEY;

module.exports = {
    name: 'gif',
    description: 'Gets a random gif or searches for a gif based on search keywords.',
    execute(message, args) {
        if (!args.length) { //if there are no keywords then we just get a random gif
            url = `https://api.giphy.com/v1/gifs/random?api_key=${giphykey}&tag=funny&rating=r`;
            superagent
                .get(url)
                .then(res => message.channel.send(res.body.data.image_url))
                .catch(error => console.log(error))
        }
        else { //otherwise we use the giphy search
            url = `https://api.giphy.com/v1/gifs/search?api_key=${giphykey}&q=${args.join(' ')}`
            superagent
                .get(url)
                .then(res => {
                    const randomDataIndex = Math.floor(Math.random() * res.body.data.length)
                    message.channel.send(res.body.data[randomDataIndex].url)
                })
                .catch(error => console.log(error))
        }
    },
};