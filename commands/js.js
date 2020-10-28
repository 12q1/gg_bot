const Discord = require('discord.js');
const { judge0Fetch } = require('../apicalls/judge0');
const { primaryColor } = require('../config.json');

module.exports = {
    name: 'js',
    description: 'Run some JavaScript code.',
    usage: '!js \`\`\` [Your code goes here] \`\`\`',
    execute(message, args) {
        const codeEmbed = new Discord.MessageEmbed()
            .setColor(primaryColor)
            .setTitle('Program Output')
        Promise
            .all([judge0Fetch.createSubmission(63, args, "")])
            .then(res => {
                setTimeout(() => {
                    judge0Fetch.getSubmission(res[0].token)
                        .then(response => {
                            console.log(response)
                            //if (response.status.description !== "Accepted") return message.channel.send('Timed out')
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