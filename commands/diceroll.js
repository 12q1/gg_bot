module.exports = {
    name: 'diceroll',
    description: 'Rolls the dice.',
    aliases: ['dice'],
    execute(message, args) {
        const outcomes = [
            "⚀",
            "⚁",
            "⚂",
            "⚃",
            "⚄",
            "⚅"
        ]
        message.channel.send(outcomes[Math.floor(Math.random() * outcomes.length)])
    },
};