require('dotenv').config();
//API keys and tokens are stored in the .env file

const Discord = require('discord.js');
const superagent = require('superagent');
const client = new Discord.Client();

const prefix = "!";
const token = process.env.TOKEN;
const giphykey = process.env.GIPHYKEY;

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
    else if (command === 'help') {
        message.channel.send(
            "!8ball - returns a magic 8ball answer\n !bible - gets a random bible verse\n !joke - gets a random dad joke\n !wiki - search wikipedia\n !gif - search for a gif\n"
        )
    }
    else if (command === 'bible') { //gets a random bible verse
        superagent
            .get('https://labs.bible.org/api/?passage=random')
            .then(res => {
                let fixedText = res.text.split('</b>')
                message.channel.send(fixedText[1] + "-" + fixedText[0].replace("<b>", " "))
            })
            .catch(error => console.log(error))
    }
    else if (command === 'insult') {
        if (!args.length) { //if there are no keywords then we just get an insult directed at you
            superagent
                .get('https://insult.mattbas.org/api/insult.txt')
                .then(res => message.channel.send(res.text))
                .catch(error => console.log(error))
        }
        else { //otherwise we use the insultee's name
            url = `https://insult.mattbas.org/api/insult.txt?who=${args.join('+')}`
            superagent
                .get(url)
                .then(res => message.channel.send(res.text))
                .catch(error => console.log(error))
        }
    }
    else if (command === '8ball') { //returns a random 8ball outcome
        const outcomes = [
            "Without a doubt",
            "It is certain",
            "It is decidedly so",
            "Yes definitely",
            "You may rely on it",
            "Most likely",
            "Outlook good",
            "As I see it yes",
            "Yes",
            "Signs point to yes",
            "Very doubtful",
            "My reply is no",
            "Don't count on it",
            "Outlook not so good",
            "Better not tell you now",
            "My sources say no",
            "Ask again later",
            "Reply hazy try again",
            "Concentrate and ask again",
            "Cannot predict now"
        ]
        message.channel.send(outcomes[Math.floor(Math.random() * outcomes.length)])
    }
    else if (command === 'joke') { //gets a random dad joke
        superagent
            .get('https://icanhazdadjoke.com/')
            .set('Accept', 'text/plain')
            .then(res => message.channel.send(res.text))
            .catch(error => console.log(error))
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
            .catch(error => console.log(error))
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
    else if (command === 'remind') {
        if (!args.length) {
            message.channel.send("You didn't provide any arguments")
        }
        else {
            const minutes = args[0];
            args.shift()
            message.channel.send(`${message.author}, you will receive a reminder in ${minutes} minute(s)`)
            setTimeout(() => {
                message.channel.send(`${args.join(" ")}`)
            }, 60000 * minutes)
        }
    }
});

client.login(token);
