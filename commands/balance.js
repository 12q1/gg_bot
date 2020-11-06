const Discord = require('discord.js');
const { primaryColor } = require('../config.json');
const { users, servers } = require('../dbObjects');

module.exports = {
    name: 'balance',
    description: 'Shows the balance for all members of a server.',
    execute(message, args) {
        if(!message.guild) return message.channel.send("This command only works on servers/guilds")
        const balanceEmbed = new Discord.MessageEmbed()
            .setColor(primaryColor)
            .setTitle("Balance")
        const serverID = message.guild.id
        users.findAll({ where: { server_id: serverID } })
            .then(res => {
                let descriptionString = "\`\`\`"//string builder, map below pushes more into it
                res
                    .sort((a, b) => a.dataValues.name.localeCompare(b.dataValues.name)) //sorts alphabetically by username
                    .map(user => {
                        const numberOfHyphens = 25 - user.dataValues.name.length - user.dataValues.balance.toString().length
                        descriptionString += `${user.dataValues.name} ${"―".repeat(numberOfHyphens)} ${user.dataValues.balance}\n`
                    })
                descriptionString += "\`\`\`"//close it off with codeblock for monospace
                balanceEmbed.setDescription(descriptionString)
                message.channel.send(balanceEmbed)
            })
            .then(console.log)
    }
}