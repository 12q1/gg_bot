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

//local modules
const { controlFlow } = require('./db/dbControlFlow');

//db models
const { users, servers } = require('./db/dbObjects');

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

    //this section checks all servers & users gg_bot is connected to and makes a database entry
    const clientInfo = () => {
        return client.guilds.cache.map(async server => {
            return result = {
                serverID: server.id,
                serverName: server.name,
                users: await server.members.fetch()
            }
        })
    }

    Promise.all([...clientInfo()])
        .then(res => {
            let userDetails = [];
            const serverDetails = res.map(server => {
                server.users.map(x => x.user)
                    .filter(x => x.bot === false)
                    .map(user => {
                        userObject = {
                            serverID: server.serverID,
                            userID: user.id,
                            name: user.username
                        }
                        userDetails.push(userObject)
                    })
                return {
                    serverID: server.serverID,
                    name: server.serverName
                }
            })
            //pushes data to control flow to be sent to db sequentially
            controlFlow(serverDetails.concat(userDetails))
        })
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
        //message.react('✅')
        command.execute(message, args);
    } catch (error) {
        console.error(error);
        message.reply('there was an error trying to execute that command!');
    }
});

client.on('presenceUpdate', (oldPresence, newPresence) => {
    console.log(oldPresence, newPresence)
})

client.on('voiceStateUpdate', (oldState, newState) => {
    console.log(oldState, newState)
})

client.login(token);
