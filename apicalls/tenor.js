require('dotenv').config();
const superagent = require('superagent');
const tenorkey = process.env.TENORKEY;

const tenorFetch = {
    search : searchKeywords => {
        return superagent
            .get(`https://api.tenor.com/v1/search?q=${searchKeywords}&key=${tenorkey}&limit=5`)
            .then(res => res.body.results)
            .catch(error => console.log(error))
    },
}

exports.tenorFetch = tenorFetch