require('dotenv').config();
const Discord = require('discord.js');
const superagent = require('superagent');
const battleMetricsToken = process.env.BATTLEMETRICSTOKEN
const { convertMS } = require('../utils/time.js');

module.exports = {
    name: 'squad',
    description: 'squad',
    execute(message, args) {
        if (!args.length) { //if there are no arguments we return a list of populated servers 3000km from Amsterdam
            superagent
                .get('https://api.battlemetrics.com/servers?filter[game]=squad&filter[players][min]=50&location=52.3676%2C4.9041&filter[maxDistance]=3000&sort=rank&page[size]=20')
                .then(res => {
                    const serverListEmbed = new Discord.MessageEmbed()
                        .setColor('#0099ff')
                        .setTitle('Squad Server List:')

                    res.body.data.map(server => {
                        serverListEmbed.addFields({name: `${server.attributes.name}`, value: `(${server.attributes.players}/${server.attributes.maxPlayers}) - Hosted in [${server.attributes.country}]`})
                    })
                    message.channel.send(serverListEmbed)
                })
                .catch(error => console.log(error))
        }
        else { //else we lookup the player on battlemetrics
            const playerIDs = {
                disannul: 726009583,
                nato187: 142228847,
                graybox: 910950113,
                maddog: 726010844
            }
            superagent
                .get(`https://api.battlemetrics.com/players/${playerIDs[args[0].toLowerCase()]}/relationships/sessions`)
                .set('Authorization', `Bearer ${battleMetricsToken}`)
                .then(res => {
                    const lastSeen = convertMS(Date.now() - Date.parse(res.body.data[0].attributes.stop))
                    //need a second API call to retreive server name from server ID
                    superagent
                        .get(`https://api.battlemetrics.com/servers/${res.body.data[0].relationships.server.data.id}`)
                        .then(response => {
                            const playerEmbed = new Discord.MessageEmbed()
                                .setColor('#0099ff')
                                .setTitle(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)}`)
                                .setURL(`https://www.battlemetrics.com/players/${playerIDs[args[0].toLowerCase()]}`)
                                .addFields(
                                    { name: 'Last Seen:', value: `${lastSeen.day} days, ${lastSeen.hour} hours, ${lastSeen.minute} minutes ago`},
                                    { name: 'Server:', value: `${response.body.data.attributes.name}`}
                                )
                            message.channel.send(playerEmbed)
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    },
};