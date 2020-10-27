const superagent = require('superagent');

const insultFetch = (name) => {
    let url = 'https://insult.mattbas.org/api/insult.txt'
    if(name) url += `?who=${name}`
    return superagent
        .get(url)
        .then(res=> {
            let insult = res.text
            if(name.includes('<@!')) return insult.replace(/^/, name)
            return insult
        })
        .catch(error => console.log(error))
}

exports.insultFetch = insultFetch