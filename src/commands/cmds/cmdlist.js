const {Command, CommandMessage} = require('discord.js-commando');

module.exports = class CommandList extends Command {
    constructor(client){
        super(client, {
            name: 'cmdlist',
            memberName: 'cmdlist',
            description: 'Get a list of commands.',
            group: 'cmds'
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg){
        let client = msg.client
        let reg = client.registry
        let list = []
        let uslCommands = reg.commands.findAll("groupID", "usl")
        let normalCmds = reg.commands.findAll("groupID", "cmds")
        let nitroBoosters = reg.commands.findAll("groupID", "nitro")
        if (normalCmds.length > 0){
            list.push(`<:info:647267581169762315> **\`Commands\`**\n${normalCmds.map(cf => `• ` + cf.name + ` ${cf.format ? cf.format : ""} ` + "- " + cf.description).join("\n")}`)
        }
        if (uslCommands.length > 0){
            list.push(`<:USL:647267038858969107> **\`Commands Reserved for USL\`**\n${uslCommands.map(c => `• ` + c.name + ` ${c.format ?  c.format  : ""} ` + "- " + c.description).join("\n")}`)
        }
        if (nitroBoosters.length > 0){
            list.push(`<:booster:647267279133868101> **\`Commands Reserved for USL Boosters\`**\n${nitroBoosters.map(cf => `• ` + cf.name + ` ${cf.format ? cf.format : ""} ` + "- " + cf.description).join("\n")}`)
        }
        msg.say(list.join("\n"))
    }
}