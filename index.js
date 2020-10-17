const Discord = require('discord.js');
const superagent = require('superagent');
const { prefix, token, giphykey } = require('./config.json');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping') {
        message.channel.send('pong');
    }
    else if (command === 'beep') {
        message.channel.send('boop');
    }
    else if (command === 'wiki') { //makes a request to wikipedia open search and returns the first hit
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
            .catch((error) => { console.log(error) })
    }
    else if (command === 'gif') { //makes a request to the giphy random API
        if (!args.length) { //if there are no keywords then we just get a random gif
            url = `https://api.giphy.com/v1/gifs/random?api_key=${giphykey}&tag=funny&rating=r`;

            superagent
                .get(url)
                .then(res => message.channel.send(res.body.data.image_url))
                .catch(error => console.log(error))
        }
        else { //otherwise we use the giphy translate feature to get a reaction gif
            url = `https://api.giphy.com/v1/gifs/translate?api_key=${giphykey}&s=${args.join(' ')}`

            superagent
                .get(url)
                .then(res => message.channel.send(res.body.data.url))
                .catch(error => console.log(error))
        }
    }
});

client.login(token);
