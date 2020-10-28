const Discord = require('discord.js');
const { judge0Fetch } = require('../apicalls/judge0');
const { primaryColor } = require('../config.json');

module.exports = {
    name: 'bash',
    description: 'Run some Bash code.',
    usage: "!bash ''' <your code goes here> '''",
    execute(message, args) {
        const codeEmbed = new Discord.MessageEmbed()
            .setColor(primaryColor)
            .setTitle('Program Output')
            .setFooter('Powered by Judge0 & RapidAPI')
        Promise
            .all([judge0Fetch.createSubmission(46, args, "")])
            .then(res => {
                setTimeout(() => {
                    if(!res[0].token) return message.channe.send(`${message.author} something went wrong, please check the format of your code`)
                    judge0Fetch.getSubmission(res[0].token)
                        .then(response => {
                            codeEmbed.addFields(
                                { name: 'stdout:', value: `\`\`\`${response.stdout}\`\`\`` },
                                { name: 'Time:', value: `${response.time} sec` },
                                { name: 'Memory:', value: `${response.memory}b` },
                                { name: 'stderr:', value: `\`\`\`${response.stderr}\`\`\`` },
                                { name: 'Message:', value: `${response.message}` },
                            )
                            message.channel.send(codeEmbed)
                        })
                }, 5000)
            })
            .catch(error => console.log(error))
    },
};