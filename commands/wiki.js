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
            action: "opensearch",
            search: args.join(' '),
            limit: "5",
            namespace: "0",
            format: "json"
        }

        url = url + "?origin=*";
        Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

        superagent
            .get(url)
            .then((res) => { message.channel.send(res.body[3][0]) })
            .catch(error => console.log(error))
    },
};