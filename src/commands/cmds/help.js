const Discord = require('discord.js');
const {Command, CommandMessage} = require('discord.js-commando');
const tM = require('../../modules/topicMod');

module.exports = class HelpCommand extends Command {
    constructor(client){
        super(client, {
            name: 'help',
            aliases: ["howto"],
            description: 'Shows how to setup your server to start receiving invites.',
            memberName: 'help',
            throttling: {
                usages: 1,
                duration: 2
            },
            group: 'cmds'
        })
    }

    /**
     * @param {CommandMessage} msg
     */
    async run(msg){
        msg.say(`For each channel in your server, set the topic of it to any of the following topics.\n\n__*Topics*__\n${tM.topics.map(t => `\`${t}\` - *${tM.topics_D[t]}*`).join("\n")} https://i.imgur.com/izsmATI.gifv`)
    }
}