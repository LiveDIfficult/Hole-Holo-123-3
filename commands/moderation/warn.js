const Discord = require("discord.js")
const { prefix } = require("../../botconfig.json");
const fs = require("fs");
let warns = JSON.parse(fs.readFileSync(`./warnings.json`));
module.exports = {
  config: {
      name: "warn",
      aliases: ["w", "warning"],
      usage: "<user> <reason>",
      category: "moderation",
      description: "Warning a member in the discord!",
      accessableby: "Members"
  },
  run: async (bot, message, args) => {

let wUser = message.mentions.members.first() || message.guild.members.get(args[0]);
if(!wUser) return message.channel.send(":x: Please, supply the user")

let reason = args.slice(1).join(" ")
if(!reason) reason = "No Reason"

if(!message.member.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(":x: You do not have permissions to use this command, Missing permissions: `MANAGE_MESSAGES`")

if(!wUser.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"]))

if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(":x: I do not have permission to perform this command, Missing permissions: `MANAGE_MESSAGES`")
message.delete()
if(!warns[wUser.id]) warns[wUser.id] = {
    warns: 0
  };

  warns[wUser.id].warns++;

  fs.writeFile("./warnings.json", JSON.stringify(warns), (err) => {
    if (err) console.log(err)
  });

let embed = new Discord.RichEmbed()
.setColor("#fae034")
.setTitle("Success Warned")
.setThumbnail(message.guild.iconURL)
.addField("Type:", "**Warn**", true)
.addField("Author Command:", message.author.username, true)
.addField("Warned User:", wUser.user.username)
.addField("Reason:", reason, true)
.addField("Date:", message.createdAt.toLocaleString(), true)

message.channel.send(embed);
}
}