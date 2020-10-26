require('dotenv').config();
const tmdbKey = process.env.TMDBKEY;
const superagent = require('superagent');

const tmdbFetch = mediaTitle => {
    return superagent
        .get(`https://tastedive.com/api/similar?q=${mediaTitle}&limit=5`)
        .then(res => res.body)
        .catch(error => console.log(error))
}

exports.tmdbFetch = tmdbFetch