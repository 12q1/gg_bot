require('dotenv').config();
const superagent = require('superagent');
const giphykey = process.env.GIPHYKEY;

const giphyFetch = {
    random : () => {
        return superagent
            .get(`https://api.giphy.com/v1/gifs/random?api_key=${giphykey}&tag=funny&rating=r`)
            .then(res => res.body.data.image_url)
            .catch(error => console.log(error))
    },
    search : searchKeywords => {
        return superagent
            .get(`https://api.giphy.com/v1/gifs/search?api_key=${giphykey}&q=${searchKeywords}`)
            .then(res => res.body.data)
            .catch(error => console.log(error))
    },
    translate : searchKeywords => {
        return superagent
            .get(`https://api.giphy.com/v1/gifs/translate?api_key=${giphykey}&s=${searchKeywords}`)
            .then(res => res.body.data)
            .catch(error => console.log(error))
    }
    //bot doesn't use the translate endpoint anymore but it's here if we ever want to
}

exports.giphyFetch = giphyFetch