const { RichEmbed } = require("discord.js")
const { prefix } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "unban",
        aliases: ["unb", "unlock"],
        usage: "<id> <reason>",
        category: "moderation",
        description: "Unban a member in the discord!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
let banMember = await bot.fetchUser(args[0])

if(!banMember) return message.channel.send(":x: Please enter user ID")

if(!message.member.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: You do not have permissions to use this command, Missing permissions: `BAN_MEMBERS`")

let reason = args.slice(1).join(" ")
if(!reason) reason = "No Reason"
         
if(!message.guild.me.hasPermission(["BAN_MEMBERS", "ADMINISTRATOR"])) return message.channel.send(":x: I do not have permission to perform this command, Missing permissions: `BAN_MEMBERS`")|
    message.delete()
        try {
            message.guild.unban(banMember, {reason: reason})
        }catch(e){

        }
        
         
let embed = new Discord.RichEmbed()
.setColor("#fae034")
.setTitle("Success Unbanned")
.setThumbnail(message.guild.iconURL)
.addField("Type:", "**Unban**", true)
.addField("Author Command", message.author.username, true)
.addField("Unbanned User:", `${banMember.username}#${banMember.discriminator}`, true)
.addField("Reason:", reason, true)
.addField("Date:", message.createdAt.toLocaleString(), true)

message.channel.send(embed);
}
}