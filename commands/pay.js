const { users } = require('../db/dbObjects');
const { economy } = require('../config.json');

module.exports = {
    name: 'pay',
    description: 'transfer funds to another user',
    usage: "!pay <@username> <amount>",
    execute: async (message, args) => {
        if (!message.guild) return message.channel.send("This command only works on servers/guilds")
        if (!args) return message.channel.send("You didn't provide any arguments")
        const amount = parseInt(args[1])
        const targetID = args[0].replace(/[^\w\s]/gi, '')
        const user = await users.findOne({
            where: {
                server_id: message.guild.id,
                user_id: message.author.id
            }
        })
        const target = await users.findOne({
            where: {
                server_id: message.guild.id,
                user_id: targetID
            }
        })
        if (amount > user.balance) return message.channel.send(`You don't have enough ${economy.currencyName}s`)
        await user.decrement(
            'balance', { by: amount }
        )
        await target.increment(
            'balance', { by: amount }
        )
        message.channel.send(`Successfully sent ${amount}${economy.currencySymbol}'s`)
    }
}