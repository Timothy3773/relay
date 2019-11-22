const {Channel, TextChannel, Guild, GuildMember} = require('discord.js');

let topics = ["discussion", "nitro_emotes", "bot", "advertising", "politics", "gaming", "media", "anime", "rp", "art", "shitposting", "misc", "tech", "nsfw", "sport", "eu"]

let topics_D = {
    "discussion": "Servers related to discussion on many topics.",
    "nitro_emotes": "Discord Nitro emote servers.",
    "bot": "Servers that are hosts for the support of the bot or are related directly to bots.",
    "advertising": "Other Discord servers based on server listing.",
    "politics": "Servers related to the discussion of politics.",
    "gaming": "Servers related to a specific game, or for the discussion of gaming at a whole.",
    "media": "Servers related to the discussion of media (not including art).",
    "anime": "Servers related to manga or anime.",
    "rp": "Servers dedicated to roleplaying.",
    "art": "Servers related to art, including the musical arts.",
    "shitposting": "Servers related to shitposting/memes. No NSFW servers are listed here.",
    "misc": "Servers that don't seem to fit in any other topic.",
    "tech": "Servers related to development, coding, or tech in all.",
    "nsfw": "Servers related to the discussion of NSFW topics or have channels for NSFW content. <:NSFW:390356185557237763>",
    "sport": "Discussion of sports.",
    "eu": "Servers in the European region."
}

let regex = /{topic-(\S+)}/mg





/**
 * @param {String} item 
 * @param {Guild} guild
 */
var check = (item, guild) => {
    if (item && guild){
        let list = guild.channels.filterArray(c => c.type == "text" && c.topic && c.topic.includes(`{topic-${String(topics[topics.indexOf(item)])}}`))
        if (list && list.length > 0){
            return list.map(ch => `${ch} - \`${ch.id}\``).join("\n");
        }else{
            return "🚨 Error, the topic provided is not a USL supported topic. 🚨"
        }
    }
}

/**
 * @param {String} item
 * @param {TextChannel} channel
 * @param {GuildMember} user
 */
var set = async (item, channel, user) => {
    if (item && channel && user) {
        if (!user.hasPermission("MANAGE_CHANNELS")) return "Missing permission `MANAGE CHANNELS`";
        if (!channel.topic.includes(`{topic-${String(topics[topics.indexOf(item)])}}`)){
            if (channel.topic !== null){
                channel.setTopic(`{topic-${String(topics[topics.indexOf(item)])}}`)
            }else{
                channel.setTopic(channel.topic + ` {topic-${String(topics[topics.indexOf(item)])}}`)
            }
        }else{
            channel.setTopic(channel.topic.replace(`{topic-${String(topics[topics.indexOf(item)])}}`, ""))
        }
    }
}

module.exports = {check, topics, topics_D, set}
