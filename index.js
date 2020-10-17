const Discord = require('discord.js');
const { search } = require('superagent');
const superagent = require('superagent');
const { prefix, token } = require('./config.json');
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
    else if (command === 'wiki') {
        if (!args.length) {
            return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
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
            .then((res) => {message.channel.send(res.body[3][0])})
            .catch((error) => {console.log(error)})

        //message.channel.send(`Command name: ${command}\nArguments: ${args.join(' ')}`);
    }
    // other commands...
});

client.login(token);
