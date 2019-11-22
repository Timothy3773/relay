const {Command,CommandMessage} = require('discord.js-commando');
const conf = require('../../../src/conf.json');

module.exports = class CheckIsBoosted extends Command {
    constructor(client){
        super(client, {
            name: 'checkboost',
            memberName: 'checkboost',
            description: `Check your Boost status on USL.`,
            group: 'nitro'
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg){
        if (msg.author.id == "130501049734791169") return msg.say("Really cats? The owner of USL is checking if they're cool...");
        if (!msg.client.guilds.get(conf.uslServer).members.has(msg.author.id)) return msg.say("You're not even in the *United Server Lisitngs* server.");
        msg.say(msg.client.guilds.get(conf.uslServer).members.get(msg.author.id).roles.has(conf.nitroBoostUSL) ? "<:approve:647270592097288193> You are currently boosting United Server Listings." : "<:deny:647270592235700235> You are not currently boosting United Server Listings.")
    }
}