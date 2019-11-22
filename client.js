const Discord = require('discord.js');
const path = require('path');
const {CommandoClient} = require('discord.js-commando');

let client = new CommandoClient({
    disableEveryone: true,
    owner: ["203587309843513344", "130501049734791169"],
    disabledEvents: ["TYPING_START"],
    commandPrefix: ";",
    unknownCommandResponse: false,
    messageCacheMaxSize: 500
})

let reg = client.registry
reg.registerDefaultTypes()
reg.registerGroups(
    [
        {name: 'Regular Commands', id: 'cmds'},
        {name: 'Utility', id: 'util'},
        {name: 'USL Only Commands', id: 'usl', guarded: true},
        {name: 'USL Boosters', id: 'nitro'}
    ]
)
reg.registerCommandsIn(path.join(__dirname, "src/commands"))

client.on("guildCreate", (guild) => {
    if (!guild.members.get(client.user.id).hasPermissions(2146958847)){
        guild.owner.send("🚨 Oh no! It seems I can't operate on your server correctly! Here's why; 🚨\n • *You changed the permissions before inviting the bot.*\n • *The bot's role was magically destroyed.*\n***To save resources, I was forced to leave your server. You can always add me back!*** <https://discordapp.com/oauth2/authorize?client_id=631639952861429802&permissions=1544416471&scope=bot>")
        guild.leave()
    }
})

/*Client rendered events */
client.on('ready', () => {
    console.log("relay online")
    client.user.setPresence({game: {name: 'Coming soon™️'}})
})

client.login(require('./averysecretthing.json').token)