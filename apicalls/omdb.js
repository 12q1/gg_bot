require('dotenv').config();
const omdbkey = process.env.OMDBKEY;
const superagent = require('superagent');

const omdbFetch = movieTitle => {
    return superagent
        .get(`http://www.omdbapi.com/?t=${movieTitle}&apikey=${omdbkey}`)
        .then(res => res.body)
        .catch(error => console.log(error))
}

exports.omdbFetch = omdbFetch