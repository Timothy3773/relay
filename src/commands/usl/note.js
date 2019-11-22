const {Command, CommandMessage} = require('discord.js-commando');

module.exports = class AddNote extends Command {
    constructor(client){
        super(client, {
            name: 'note',
            memberName: 'note',
            group: 'usl',
            guildOnly: true,
            description: 'Add a note to a message. USL Only. (**Invite managers only**)',
            args: [
                {
                    type: 'message',
                    prompt: 'Please enter a valid message ID.',
                    key: 'message',
                    wait: 500
                },
                {
                    type: 'string',
                    key: 'note',
                    prompt: 'Please add a note.',
                    wait: 500,
                    max: 100
                }
            ]
        })
    }

    /**
     * 
     * @param {CommandMessage} msg 
     */
    async run(msg, {message, note}){
        if (msg.guild.id !== require('../../../src/conf.json').uslServer) return msg.say("You must be in USL to use this!");
        if (!msg.member.roles.get(require('../../../src/conf.json').invManagerID)) return msg.say("You must be an invite manager to use this!");
        msg.channel.fetchMessage(message).then(p => {
            p.edit(p.content += `\n\`NOTE:\`${note}`)
        })
    }
}