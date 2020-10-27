const { battleMetrics, primaryColor } = require('../config.json')
const Discord = require('discord.js');
const { convertMS } = require('../utils/time.js');
const { battlemetricsFetch } = require('../apicalls/battlemetrics');

module.exports = {
    name: 'squad',
    description: 'Gets a list of Squad servers or searches for player info.',
    execute(message, args) {
        if (!args.length) { //if there are no arguments we return a list of populated servers 3000km from Amsterdam
            Promise.all([battlemetricsFetch.serverList('squad')])
                .then(res => {
                    const serverListEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Squad Server List:')
                    res[0].map(server => {
                        serverListEmbed.addFields({ name: `${server.attributes.name}`, value: `(${server.attributes.players}/${server.attributes.maxPlayers}) - Hosted in [${server.attributes.country}]` })
                    })
                    message.channel.send(serverListEmbed)
                })
                .catch(error => console.log(error))
        }
        else { //else we lookup the player on battlemetrics
            const playerName = args[0].toLowerCase();
            const playerIDs = battleMetrics.playerIDs
            if (!Object.keys(playerIDs).includes(playerName)) return message.channel.send("I couldn't find that player, have you set their battlemetrics ID in ./config.json?")
            //checks if playerID object has the player in its data (pulled from ./config.json)

            const playerEmbed = new Discord.MessageEmbed()
                .setColor(primaryColor)
                .setTitle(playerName.charAt(0).toUpperCase() + args[0].slice(1))

            Promise
                .all([battlemetricsFetch.playerSessions(playerIDs[playerName])])
                .then(res => {
                    if (res[0][0].attributes.stop !== null) {
                        const lastSeen = convertMS(Date.now() - Date.parse(res[0][0].attributes.stop))
                        playerEmbed.addFields({ name: 'Last Seen:', value: `${lastSeen.day} days, ${lastSeen.hour} hours, ${lastSeen.minute} minutes ago` })
                    }
                    else {
                        playerEmbed.setDescription('Currently online')
                    }
                    //need a second API call to retriver server name from serverID
                    const serverID = res[0][0].relationships.server.data.id
                    Promise
                        .all([battlemetricsFetch.server(serverID)])
                        .then(response => {
                            playerEmbed.addFields({name: 'Server', value: `${response[0].attributes.name}`})
                            message.channel.send(playerEmbed)
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    },
};