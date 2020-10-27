const superagent = require('superagent');

const adviceFetch = () => {
    return superagent
        .get('https://api.adviceslip.com/advice')
        .then(res=> {
            const data =JSON.parse(res.text)
            return data.slip.advice
        })
        .catch(error => console.log(error))
}

exports.adviceFetch = adviceFetch