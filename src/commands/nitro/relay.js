const {Command, CommandMessage} = require('discord.js-commando');
const conf = require('../../../src/conf.json');

module.exports = class RelayServer extends Command {
    constructor(client){
        super(client, {
            name: 'relay',
            memberName: 'relay',
            description: 'Relay your server to USL.',
            group: 'nitro',
            guildOnly: true
        })
    }
    
    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg){
        if (!msg.client.guilds.get(conf.uslServer).members.has(msg.author.id)) return msg.say("You're not even in the *United Server Lisitngs* server.");
        if (!msg.client.guilds.get(conf.uslServer).members.get(msg.member.id).roles.has(conf.nitroBoostUSL)) return msg.say("You're not a Nitro Booster in USL.");
        if (!msg.guild.members.get(msg.client.user.id).hasPermission("CREATE_INSTANT_INVITE")) return msg.say("I require the `Create Instant Invite` permission to do this.");
        if (!msg.member.hasPermission("MANAGE_GUILD")) return msg.say("This command requires you to have the `Manage Server` permission to work.");
        let chan = msg.guild.channels.filter(c => c.type == "text")
        if (chan.size > 0){
            chan.random().createInvite({temporary: false, maxAge: 0, maxUses: 0}, "Relayed").then(inv => {
                msg.client.channels.get(require('../../../src/conf.json').relayChan).send(`${msg.guild.name}\n${inv.toString()}`)
            })
            msg.say("Server relayed!")
        }
    }
}