require('dotenv').config();
const judge0Key = process.env.JUDGE0KEY;
const superagent = require('superagent')

const judge0Fetch = {
    getLanguages: () => {
        return superagent
            .get("https://judge0.p.rapidapi.com/languages")
            .set("x-rapidapi-key", judge0Key)
            .then(res => res.body)
            .catch(error => console.log(error))
    },
    getSubmission: token => {
        return superagent
            .get(`https://judge0.p.rapidapi.com/submissions/${token}`)
            .set("x-rapidapi-key", judge0Key)
            .then(res => res.body)
            .catch(error => console.log(error))
    },
    createSubmission: (languageID, data, stdin) => {
        return superagent
            .post("https://judge0.p.rapidapi.com/submissions")
            .send({ language_id: languageID, source_code: data, stdin: "" })
            .set("x-rapidapi-key", judge0Key)
            .then(res => res.body)
            .catch(error => console.log(error))
    }
}

exports.judge0Fetch = judge0Fetch