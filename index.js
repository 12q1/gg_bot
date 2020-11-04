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

//db connection
const sequelize = new Sequelize('database', 'user', 'password', {
    host: 'localhost',
    dialect: 'sqlite',
    logging: false,
    storage: 'database.sqlite'
})

//models
const Users = sequelize.define('users', {
    user_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    balance: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
        allowNull: false,
    },
}, {
    timestamps: false,
});

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
    //console.log(client.guilds.cache)
    //syncing models
    Users.sync()
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
