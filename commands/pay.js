const { users, servers } = require('../db/dbObjects');
module.exports = {
    name: 'pay',
    description: 'transfer funds to another user',
    usage: "!pay <@username> <amount>",
    execute: async (message, args) => {
        if (!message.guild) return message.channel.send("This command only works on servers/guilds")
        if (!args) return message.channel.send("You didn't provide any arguments")
        const amount = parseInt(args[1])
        const serverID = message.guild.id
        const userID = message.author.id
        const targetID = args[0].replace("<@!", "").replace(">", "")
        console.log(serverID, userID, targetID)
        const user = await users.findOne({
            where: {
                server_id: serverID,
                user_id: userID
            }
        })
        const target = await users.findOne({
            where: {
                server_id: serverID,
                user_id: targetID
            }
        })
        console.log(targetID)

        if (user.balance >= amount) {
            await user.decrement(
                'balance', { by: amount }
            )
            await target.increment(
                'balance', { by: amount }
            )
            message.channel.send(`Successfully sent ${amount} monies`)
        }
    }
}