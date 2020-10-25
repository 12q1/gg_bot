require('dotenv').config();
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
                    const serverList = res.body.data.map(server => {
                        return `[${server.attributes.country}] - ${server.attributes.name.replace('.gg', '')} - (${server.attributes.players}/${server.attributes.maxPlayers})\n`
                    })
                    message.channel.send(serverList.join(''))
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
                            message.channel.send(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} was seen ${lastSeen.day} days, ${lastSeen.hour} hours, ${lastSeen.minute} minutes ago on ${response.body.data.attributes.name.replace('.gg', '')}`)
                        })
                        .catch(error => console.log(error))
                })
                .catch(error => console.log(error))
        }
    },
};