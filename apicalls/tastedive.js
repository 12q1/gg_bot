require('dotenv').config();
const tasteDiveKey = process.env.TASTEDIVEKEY;
//API key not needed for public requests despite documentation
const superagent = require('superagent');

const tasteDiveFetch = (mediaTitle, numberOfResults) => {
    let defaultLimit = 5
    if(numberOfResults) defaultLimit = numberOfResults
    return superagent
        .get(`https://tastedive.com/api/similar?q=${mediaTitle}&limit=${defaultLimit}&info=1&k=${tasteDiveKey}`)
        .then(res => res.body.Similar.Results)
        .catch(error => console.log(error))
}

exports.tasteDiveFetch = tasteDiveFetch