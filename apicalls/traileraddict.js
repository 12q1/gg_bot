const superagent = require('superagent');

const trailerAddictFetch = mediaTitle => {
    return superagent
        .get(`http://api.traileraddict.com/?film=${mediaTitle}&count=3`)
        .then(res => res.body)
        .catch(error => console.log(error))
}

exports.trailerAddictFetch = trailerAddictFetch