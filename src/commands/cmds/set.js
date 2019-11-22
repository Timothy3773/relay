const Discord = require('discord.js');
const {Command, CommandMessage} = require('discord.js-commando');
const tM = require('../../modules/topicMod');


let regex = /\w+$/
module.exports = class SetTopic extends Command {
    constructor(client){
        super(client, {
            name: 'set',
            description: 'Set the topic of a channel. This will set the topic of the channel you\'re currently in.',
            throttling: {
                usages: 1,
                duration: 1
            },
            group: 'cmds',
            memberName: 'cmds',
            guildOnly: true,
            examples: [";set #general art"]
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg){
        if (!msg.member.hasPermission("MANAGE_CHANNELS")) return msg.reply("🚨 You need the *Manage Channels* permission. 🚨");
        let args = msg.parseArgs()
        if (args.length > 0){
            let newargs = regex.exec(args)
            let topic = newargs
            console.log(String(newargs))
            let channel
            if (msg.mentions.channels.size == 0){
                channel = msg.channel
            }else{
                channel = msg.mentions.channels.first()
            }
            console.log(msg.mentions.channels.first())
            if (!channel) return msg.reply("Couldn't set. Please enter a valid channel next time.");
            if (tM.topics.includes(String(topic)) == false) return msg.reply("Couldn't set topic. Please enter a USL topic next time.");
            tM.set(String(topic), channel, msg.member)
        }

    }
}
