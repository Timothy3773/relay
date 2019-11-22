const {Command, CommandMessage} = require('discord.js-commando');
const conf = require('../../conf.json');

module.exports = class BotUpdateCommand extends Command {
    constructor(client){
        super(client, {
            name: 'botupdates',
            memberName: 'botupdates',
            aliases: ["botfeed"],
            group: 'usl',
            throttling: {
                usages: 1,
                duration: 2
            },
            description: 'Receive Relay Updates.',
            guildOnly: true
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg){
        if (msg.guild.id !== conf.uslServer) return msg.reply("🚨 This only works in USL! 🚨");
        if (msg.member.roles.has(conf.botUpdatesRoleID)){
            msg.member.removeRole(conf.botUpdatesRoleID).then(suc => {
                msg.say(`**${msg.member.displayName}**, Bot Updates role removed!`)
            })
        }else{
            msg.member.addRole(conf.botUpdatesRoleID).then(suc2 => {
                msg.say(`**${msg.member.displayName}**, Bot Updates role given!`)
            })
        }
    }
}