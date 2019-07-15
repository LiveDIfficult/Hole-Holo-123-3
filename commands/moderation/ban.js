const { RichEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "ban",
        aliases: ["b", "lock"],
        usage: "<user> <reason>",
        category: "moderation",
        description: "Ban a member in the discord",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

let banMember = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!banMember) return message.channel.send(":x: Please, supply the user")

if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: You do not have permissions to use this command, Missing permissions: `BAN_MEMBERS`")

if(banMember.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: You can not banned this person");

let reason = args.slice(1).join(" ")
if(!reason) reason = "No Reason"

if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: I do not have permission to perform this command, Missing permissions: `BAN_MEMBERS`")
message.delete()
banMember.send(`Hi, you got a banned on the server **${message.guild.name}** for: ${reason}`).then(() =>
message.guild.ban(banMember, { reason: reason})).catch(err => console.log(err))

let embed = new Discord.RichEmbed()
.setColor("#fae034")
.setTitle("Success Banned")
.setThumbnail(message.guild.iconURL)
.addField("Type:", "**Ban**", true)
.addField("Author Command:", message.author.username, true)
.addField("Banned User:", `${banMember.username} (${banMember.discriminator})`)
.addField("Reason:", reason, true)
.addField("Date:", message.createdAt.toLocaleString(), true)

message.channel.send(embed);
}
}