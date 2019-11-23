const {Command, CommandMessage} = require('discord.js-commando');

module.exports = class JoinUSL extends Command {
    constructor(client){
        super(client, {
            name: 'join',
            memberName: 'join',
            group: 'cmds',
            description: 'An invite to United Server Listings.',
            throttling: {
                usages: 1,
                duration: 2
            }
        })
    }
    async run(msg){
        msg.direct("<:join:644702842560446504> https://discord.gg/ads").then(ok => {
            msg.reply("I have sent you an invite. Check your DMs!");
        })
    }
}