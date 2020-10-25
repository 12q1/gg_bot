module.exports = {
    name: 'diceroll',
    description: 'Dice Roll',
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