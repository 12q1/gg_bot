//control flow to avoid overloading db with simultaneous queries
//based on Mixu's example http://book.mixu.net/node/ch7.html
//TODO handle both types of models (servers & users)

const { users, servers } = require('../dbObjects');

const controlFlow = (array) => {
    const asyncDbQuery = (arg, callback) => {

        if (arg.userID) {
            console.log(`syncing ${arg.name}'s user data`)
            setTimeout(() => {
                users.findOrCreate(
                    {
                        where: {
                            server_id: arg.serverID,
                            user_id: arg.userID,
                        },
                        defaults: {
                            name: arg.name
                        }
                    })
                callback()
            }, 1000)
        }
        else {
            console.log(`syncing ${arg.name} with local db`)
            setTimeout(() => {
                servers.findOrCreate({
                    where: {
                        server_id: arg.serverID,
                        name: arg.name
                    }
                })
                callback()
            }, 1000)
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