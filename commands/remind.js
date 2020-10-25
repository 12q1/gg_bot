module.exports = {
    name: 'remind',
    description: 'Remind',
    execute(message, args) {
        if (!args.length) {
            message.channel.send("You didn't provide any arguments")
        }
        else {
            const minutes = args[0];
            args.shift()
            message.channel.send(`${message.author}, you will receive a reminder in ${minutes} minute(s)`)
            setTimeout(() => {
                message.channel.send(`${args.join(" ")}`)
            }, 60000 * minutes)
        }
    },
};