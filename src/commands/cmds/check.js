const Discord = require('discord.js');
const {Command, CommandMessage} = require('discord.js-commando');
const mymod = require('../../modules/topicMod');

module.exports = class CheckTopic extends Command {
    constructor(client){
        super(client, {
            name: 'check',
            group: 'cmds',
            description: 'Check the topic of the channel given.',
            guildOnly: true,
            memberName: 'check',
            throttling: {
                usages: 1,
                duration: 2
            },
            args: [
                {
                    type: 'string',
                    label: 'topic',
                    key: 'topic',
                    prompt: 'Please enter a valid topic.',
                    wait: 200
                }
            ],
            examples: [";check art"]
        })
    }
    /**
     * @param {CommandMessage} msg
     */
    async run(msg, {topic}){
        msg.say(mymod.check(topic, msg.guild))
    }
}