const superagent = require('superagent');

const iCanHasDadJokeFetch = () => {
    return superagent
        .get(`https://icanhazdadjoke.com/`)
        .set('Accept', 'text/plain')
        .then(res => res.text)
        .catch(error => console.log(error))
}

exports.iCanHasDadJokeFetch = iCanHasDadJokeFetch