const superagent = require('superagent');

module.exports = {
    name: 'bible',
    description: 'Bible',
    execute(message, args) {
        superagent
            .get('https://labs.bible.org/api/?passage=random')
            .then(res => {
                let fixedText = res.text.split('</b>')
                message.channel.send(fixedText[1] + "-" + fixedText[0].replace("<b>", " "))
            })
            .catch(error => console.log(error))
    },
};