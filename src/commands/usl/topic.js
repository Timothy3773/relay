const {Command, CommandMessage} = require('discord.js-commando');
const tM = require('../../modules/topicMod');

module.exports = class TopicSetCMD extends Command {
    constructor(client){
        super(client, {
            name: 'topic',
            memberName: 'topic',
            throttling: {
                usages: 1,
                duration: 2
            },
            group: 'usl',
            guildOnly: true,
            description: "Send it to other servers. USL Only. (**Invite managers only**)",
            args: [
                {
                    type: 'string',
                    oneOf: ["discussion", "nitro_emotes", "bot", "advertising", "politics", "gaming", "media", "anime", "rp", "art", "shitposting", "misc", "tech", "nsfw", "sport", "eu"],
                    wait: 500,
                    key: 'topic',
                    prompt: 'Please enter a valid topic.'
                },
                {
                    type: 'message',
                    wait: 500,
                    key: 'post',
                    prompt: 'Please enter a valid message ID.'
                },
                {
                    type: 'string',
                    key: 'sname',
                    prompt: 'Please enter a name.',
                    wait: 500
                }
            ]
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg, {topic, post, sname}){
        if (msg.guild.id !== require('../../../src/conf.json').uslServer) return msg.reply("This command only works in USL.");
        if (!msg.member.roles.get(require('../../../src/conf.json').invManagerID)) return msg.reply("Only *Invite Managers* can use this command.");
        let client = msg.client
        client.channels.filter(c => c.type == "text" && c.topic && c.topic.includes(`{topic-${topic}}`)).forEach(ch => ch.send(post.content))
        client.channels.get(require('../../../src/conf.json').logChannelID).send(`\n\`\`\`diff\n+ ${sname}\nTOPIC | ${String(topic).toUpperCase()}\n\`\`\`\n`)
    }
}