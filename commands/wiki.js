const superagent = require('superagent');

module.exports = {
    name: 'wiki',
    description: 'Wiki',
    execute(message, args) {
        if (!args.length) {
            return message.channel.send(`You didn't provide any search keywords ${message.author}!`);
        }
        let url = `https://en.wikipedia.org/w/api.php`;

        const params = {
            action: "query",
            srsearch: args.join(' '),
            generator: "search",
            srlimit: "3",
            namespace: "0",
            format: "json",
            prop: "pageimage|extract",
            exsentences: "3"
        }

        url = url + "?origin=*";
        Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

        // superagent
        //     .get(`https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrsearch=${args.join('%20')}&gsrlimit=1&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=3&exlimit=max`)
        //     .then(res => {
        //         return JSON.parse(res.text)
        //     })
        //     .then(res => console.log(res))
        //TODO figure out a better way to pull extracts and images

        superagent
            .get(url)
            .then((res) => {
                console.log(res.body)
                message.channel.send(res.body[3][0])
            })
            .catch(error => console.log(error))
    },
};