const { giphyFetch } = require("../apicalls/giphy");

//TODO attribute results to giphy as per their usage conditions

module.exports = {
    name: 'gif',
    description: 'Gets a random gif or searches for a gif based on search keywords.',
    execute(message, args) {
        if (!args.length) { //if there are no keywords then we just get a random gif
            Promise
                .all([giphyFetch.random()])
                .then(res => message.channel.send(res))
                .catch(error => console.log(error))
        }
        else { //otherwise we use the giphy search
            Promise
                .all([giphyFetch.search(args.join(' '))])
                .then(res => {
                    console.log(res)
                    const randomDataIndex = Math.floor(Math.random() * res[0].length)
                    message.channel.send(res[0][randomDataIndex].url)
                })
                .catch(error => console.log(error))
        }
    },
};