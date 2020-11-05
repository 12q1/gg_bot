//control flow to avoid overloading db with simultaneous queries
//based on Mixu's example http://book.mixu.net/node/ch7.html
//TODO handle both types of models (servers & users)

const { users, servers } = require('../dbObjects');

const controlFlow = (array) => {
    const asyncDbQuery = (arg, callback) => {

        if (arg.serverID) {
            console.log(`syncing ${arg.serverName} with local db`)
            setTimeout(() => {
                servers.findOrCreate({ where: { 
                    server_id: arg.serverID, 
                    name: arg.serverName } 
                })
                callback()
            }, 2000)
        }
        else {
            console.log(`syncing ${arg.user.username}'s data`)
            setTimeout(() => {
                users.findOrCreate({where: {
                    server_id: arg.guild.id,
                    user_id: arg.user.id,
                    name: arg.user.username
                }})
                callback()
            }, 2000)
        }
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