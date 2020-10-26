require('dotenv').config();
const tasteDiveKey = process.env.TASTEDIVEKEY;
const superagent = require('superagent');

const tasteDiveFetch = mediaTitle => {
    return superagent
        .get(`https://tastedive.com/api/similar?q=${mediaTitle}&limit=5`)
        .then(res => res.body.Similar.Results)
        .catch(error => console.log(error))
}

exports.tasteDiveFetch = tasteDiveFetch