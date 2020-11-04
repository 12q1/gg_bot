//control flow to avoid overloading db with simultaneous queries
//based on Mixu's example http://book.mixu.net/node/ch7.html
//TODO handle all types of models (servers & users)

const { users, servers } = require('../dbObjects');

const controlFlow = (array) => {
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
                return series(array.shift());
            });
        }
    }

    series(array.shift())
}

exports.controlFlow = controlFlow