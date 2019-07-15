const { RichEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "unmute",
        aliases: ["unm", "speak"],
        usage: "<user> <reason>",
        category: "moderation",
        description: "Unmutes a member in the discord!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

let mutee = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!mutee) return message.channel.send(":x: Please, supply the user")

let reason = args.slice(1).join(" ")
if(!reason) reason = "No Reason"

if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send(":x: You do not have permissions to use this command, Missing permissions: `MANAGE_ROLES`")

if(!mutee.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send(":x: You can not mute this person");

if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(":x: I do not have permission to perform this command, Missing permissions: `MANAGE_ROLES`")

let muterole = message.guild.roles.find(r => r.name === "Muted")
if(!muterole) return message.channel.send("There is no `Muted` role")

mutee.removeRole(muterole.id).then(() => {
    message.delete()
    mutee.send(`Hi, you got a mute on the server **${message.guild.name}** for: ${reason}`).catch(err => console.log(err))
})

let embed = new Discord.RichEmbed()
.setColor("#fae034")
.setTitle("Success Unmuted")
.setThumbnail(message.guild.iconURL)
.addField("Type:", "**Unmute**", true)
.addField("Author Command", message.author.username, true)
.addField("Muted User:", mutee.user.username, true)
.addField("Reason:", reason, true)
.addField("Date:", message.createdAt.toLocaleString(), true)

message.channel.send(embed);
}
}