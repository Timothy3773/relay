const Discord = require('discord.js');
const {Command, CommandMessage} = require('discord.js-commando');

module.exports = class PingCommand extends Command {
    constructor(client){
        super(client, {
            name: 'ping',
            memberName: 'ping',
            description: 'Get the bot\'s response time.',
            group: 'cmds',
            throttling: {
                duration: 2,
                usages: 2
            }
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg){
        let ping = Math.floor(msg.client.ping)
        if (ping < 1500){
            msg.say(`<:uslblobaccept:640703947085971456> ${ping} ms`)
        }else{
            msg.say(`<:uslblobdeny:640704021157380096> ${ping} ms - *consider revising*`)
        }
    }
}