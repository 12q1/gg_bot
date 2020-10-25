module.exports = {
    name: 'help',
    description: 'Help',
    execute(message, args) {
        message.channel.send(
            "**!8ball** - gets a magic 8ball answer\n**!bible** - gets a random bible verse\n**!gif** - search for a gif\n**!imdb** search imdb\n**!insult** - gets a random insult\n**!joke** - gets a random dad joke\n**!remind** - sets a reminder for x minutes\n**!wiki** - search wikipedia"
        )
    },
};