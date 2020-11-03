# gg_bot
GG-Bot is a private Discord bot for use among friends, it has a number of commands many of which pull data from public APIs such as OMDB, Wikipedia, TasteDive, BattleMetrics and more. It is also able to run simple Python3, bash and JavaScript code snippets. A detailed list of available commands can be found below.

If you are an admin of a discord server and want to try the bot you can use this [link](https://discord.com/api/oauth2/authorize?client_id=767075691082153994&permissions=67648&scope=bot). 

# Motivation:
This project is primarily an exploration of the Discord.js library and its capabilities. Other goals of this project were to practice modularizing code, exploring several public APIs and testing the feasibility of running node.js on on Android.

# Available Commands:
**!8ball** - Generates a random 8ball outcome.

**!advice** - Gets a random piece of advice from the Adviceslip API.

**!bash** - Uses the Judge0 API to run simple bash commands/scripts in a sandbox.

**!beep** - Responds 'boop'.

**!bible** - Gets a randome Bible verse from the labs.bible API.

**!diceroll** - Generates a random dice roll outcome.

**!gif** - Uses the GiphyAPI to search for a gif or returns a random gif.

**!help** - Lists all commands and their usage information.

**!imdb** - Searches for movie info using the OMDB API and also suggests similar movies using the TasteDive API.

**!insult** - Generates a random insult using the insult.mattbas.org API.

**!joke** - Gets a random Dad Joke from the icanhazdadjoke API.

**!js** - Uses the Judge0 API to run simple JavaScript snippets in a sandbox.

**!ping** - Responds 'pong'.

**!python** - Uses the Judge0 API to run simple Python 3 snippets in a sandbox.

**!reminder** - Sets a reminder for x minutes and returns a message when the desired time is reached.

**!squad** - Uses the Battlemetrics API to return a list of Squad servers or searches for player info.

**!suggest** - Recommends similar media (movies, music, books) using the TasteDive API.

**!wiki** - Fetches a Wikipedia article and embeds an extract.

# Installation:
The bot requires ```node.js``` and ```yarn``` to be installed on the machine it is hosted on. It is also recommended to have ```git``` in order to easily retrieve files.

You can pull the bot's files with.
```git clone https://github.com/12q1/gg_bot.git```

In order to run this bot yourself you will also need a number of API keys and a Discord bot Token. These secrets should be stored in a ```.env``` file located in the root directory. An example file can be found on this repository under the name ```.env.example```. You will also need to generate keys/tokens for the following services:

- [Discord Bot Token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)

- [Giphy API Key](https://support.giphy.com/hc/en-us/articles/360020283431-Request-A-GIPHY-API-Key)

- [OMDB Key](http://www.omdbapi.com/apikey.aspx?__EVENTTARGET=freeAcct&__EVENTARGUMENT=&__LASTFOCUS=&__VIEWSTATE=%2FwEPDwUKLTIwNDY4MTIzNQ9kFgYCAQ9kFgICBw8WAh4HVmlzaWJsZWhkAgIPFgIfAGhkAgMPFgIfAGhkGAEFHl9fQ29udHJvbHNSZXF1aXJlUG9zdEJhY2tLZXlfXxYDBQtwYXRyZW9uQWNjdAUIZnJlZUFjY3QFCGZyZWVBY2N0x0euvR%2FzVv1jLU3mGetH4R3kWtYKWACCaYcfoP1IY8g%3D&__VIEWSTATEGENERATOR=5E550F58&__EVENTVALIDATION=%2FwEdAAU5GG7XylwYou%2BzznFv7FbZmSzhXfnlWWVdWIamVouVTzfZJuQDpLVS6HZFWq5fYpioiDjxFjSdCQfbG0SWduXFd8BcWGH1ot0k0SO7CfuulN6vYN8IikxxqwtGWTciOwQ4e4xie4N992dlfbpyqd1D&at=freeAcct&Email=)

- [Judge0 API Key via Rapid API](https://rapidapi.com/hermanzdosilovic/api/judge0/pricing)

- [Battlemetrics API Key](https://www.battlemetrics.com/developers/documentation#auth)

- [TasteDive API Key](https://tastedive.com/read/api)

- [TMDB API Key](https://developers.themoviedb.org/3/getting-started/introduction)

Then run ```yarn install``` to install the dependencies and ```yarn start``` to begin running the server. If you are developing the bot you can use ```yarn dev``` instead to watch for file changes.

Additional configurations such as changing the prefix character (default "!") can be done in `./config.json`. 

# Contribute:
If you are interested in improving this bot feel free to fork it or send a pull request. I currently don't have any contribution guidelines but please give a detailed explanation of the problem you are trying to solve or the feature you are trying to add.

# License:
This project follows the MIT license. You may do as you please with it but for personal projects please consider giving credit to the original repository and for commercial purposes please contact me before deployment.

MIT © 12q1

# Examples:

A small showcase of screenshots showing the embed styling and capabilities of this bot.

![example](https://i.imgur.com/JXIpEOD.png)

![example](https://i.imgur.com/SPzIPyT.png)

![example](https://i.imgur.com/s927gKz.png)

![example](https://i.imgur.com/RittJzT.png)

![example](https://i.imgur.com/UJCQ3tD.png)


