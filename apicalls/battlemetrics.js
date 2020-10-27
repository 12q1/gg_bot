require('dotenv').config();
const { location } = require('../config.json')
const superagent = require('superagent');
const battleMetricsToken = process.env.BATTLEMETRICSTOKEN

const battlemetricsFetch = {
    serverList: gameName => {
        return superagent
            .get(`https://api.battlemetrics.com/servers?filter[game]=${gameName}&filter[players][min]=50&location=${location.latitude}%2C${location.longitude}&filter[maxDistance]=3000&sort=rank&page[size]=20`)
            .set('Authorization', `Bearer ${battleMetricsToken}`)
            .then(res => res.body.data)
            .catch(error => console.log(error))
    },
    server: serverID => {
        return superagent
            .get(`https://api.battlemetrics.com/servers/${serverID}`)
            .set('Authorization', `Bearer ${battleMetricsToken}`)
            .then(res => res.body.data)
            .catch(error => console.log(error))
    },
    player: playerID => {
        return superagent
            .get(`https://api.battlemetrics.com/players/${playerID}`)
            .set('Authorization', `Bearer ${battleMetricsToken}`)
            .then(res => res.body.data)
            .catch(error => console.log(error))
    },
    playerSessions: playerID => {
        return superagent
            .get(`https://api.battlemetrics.com/players/${playerID}/relationships/sessions`)
            .set('Authorization', `Bearer ${battleMetricsToken}`)
            .then(res => res.body.data)
            .catch(error => console.log(error))
    }
}

exports.battlemetricsFetch = battlemetricsFetch