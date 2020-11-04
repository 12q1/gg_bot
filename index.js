require('dotenv').config();
const { prefix } = require('./config.json');

//checks to see whether we're in dev or production environment
let token;
if (process.env.NODE_ENV) {
    token = process.env.GG_BOT_TOKEN;
}
else {
    console.log('You are in development mode')
    token = process.env.GG_BOT_TEST_TOKEN;
}

//API keys and tokens are stored in the .env file use .env.example if you are setting up your own instance of this bot
//Settings stored in config.json at root directory

const fs = require('fs');

//yarn modules
const Discord = require('discord.js');
const Sequelize = require('sequelize');

//db models
const { users, servers } = require('./dbObjects');

const client = new Discord.Client();

client.commands = new Discord.Collection();

//dynamically load commands from commands directory
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}


client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);

    let serverList = client.guilds.cache.map(server => {
        return { serverID: server.id, serverName: server.name }
    })

    //control flow to avoid overloading db with simultaneous queries
    //based on Mixu's example http://book.mixu.net/node/ch7.html
    //TODO separate this into its own module

    const asyncDbQuery = (arg, callback) => {
        console.log(`syncing ${arg.serverName} with local db`)
        setTimeout(() => {
            servers.findOrCreate({ where: { server_id: arg.serverID, name: arg.serverName } })
            callback()
        }, 1000)
    }

    const series = (item) => {
        if (item) {
            asyncDbQuery(item, () => {
                return series(serverList.shift());
            });
        }
    }

    series(serverList.shift())

    //TODO figure out how to pull user info

    // const getServerList = async () => {
    //     await client.guilds.cache.map(async server => {
    //         await server.members.fetch()
    //             .then(res => res.filter(x => x.user.bot === false))
    //             .then(res => {
    //                 return {
    //                     serverID: server.id,
    //                     serverName: server.name,
    //                     users: res.map(x => x.user)
    //                 }
    //             })
    //             .catch(console.error)
    //     })
    // }

    // users.findOrCreate({
    //     where: {
    //         server_id: server.id,
    //         user_id: user.id,
    //         name: user.user.username
    //     }
    // })
});

client.on('message', message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    let args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName)
        || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    //special case for judge0 commands, args should not be treated as an array
    if (command.name === "js" || command.name === 'bash' || command.name === 'python') {
        args = message.content.slice(prefix.length + command.name.length + 1).replace(/```/g, "")
    }

    try {
        message.react('✅')
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.login(token);
