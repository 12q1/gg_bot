const superagent = require('superagent');

const bibleFetch = () => {
    return superagent
        .get('https://labs.bible.org/api/?passage=random')
        .then(res=> {
            const fixedText = res.text.split('</b>');
            return fixedText[1] + "-" + fixedText[0].replace("<b>", " ")
        })
        .catch(error => console.log(error))
}

exports.bibleFetch = bibleFetch