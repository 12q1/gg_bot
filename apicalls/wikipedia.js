const superagent = require('superagent');

const wikipediaFetch = (searchKeywords) => {
    return superagent
        .get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${searchKeywords}&gsrlimit=1&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=3&exlimit=max&piprop=original`)
        .then(res => JSON.parse(res.text))
        .catch(error => console.log(error))
}

exports.wikipediaFetch = wikipediaFetch