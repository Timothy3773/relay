const Discord = require('discord.js');
const {Command, CommandMessage} = require('discord.js-commando');
const tM = require('../../modules/topicMod');
const conf = require('../../conf.json');

module.exports = class SubmissionSystem extends Command {
    constructor(client){
        super(client, {
            name: 'submit',
            memberName: 'submit',
            group: 'cmds',
            format: String(),
            description: 'Submit your server!',
            throttling: {
                duration: 4,
                usages: 1
            },
            args: [
                {
                    type: 'string',
                    key: 'servername',
                    wait: 500,
                    prompt: 'What is the name of the server?',
                    max: 32
                },
                {
                    type: 'string',
                    key: 'serverowner',
                    prompt: 'Who owns this server? ***Please enter their tag.*** `ex: Timothy#3773`',
                    validate: owner => {
                        if (String(owner).match(/^\w+#\d{4}/gsm)) return true;
                        return "Server owner must contain tags, ex: `Timothy#3773`";
                    },
                    wait: 500,
                    min: 0,
                    max: 30
                },
                {
                    type: 'string',
                    key: 'desc',
                    prompt: 'Please describe the server.',
                    wait: 500,
                    max: 280
                },
                {
                    type: 'string',
                    key: 'invite',
                    prompt: 'And lastly, please enter a __permanent__ invite to this server.',
                    wait: 500,
                    validate: invite => {
                        if (String(invite).match(/^(https:\/\/)?(discord\.gg\/\w+)/mgs)) return true;
                        return "Please make sure this is a valid invite, ex: https://discord.gg/ads";
                    }
                }
            ]
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg, {servername, serverowner, desc, invite}){
        let client = msg.client
        if (!msg.channel.type == "dm") return msg.reply("🚨 This command only works in DM! 🚨");
        client.channels.get(conf.submitServerID).send(`\`${servername}\`\n\`OWNER:\` ${serverowner}\n\`TOPIC:\` ${desc}\n${invite} \n\`Submitted by ${msg.author.tag}\``)
    }
}