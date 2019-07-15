const Discord = require("discord.js")
const { prefix } = require("../../botconfig.json");

module.exports = {
  config: {
      name: "serverinfo",
      aliases: ["si"],
      usage: "",
      category: "miscellaneous",
      description: "Displays server information",
      accessableby: "Members"
  },
  run: async (bot, message, args) => {
  message.delete()
    let sEmbed = new Discord.RichEmbed()
    .setColor("#5291f7")
    .setTitle("Server Info")
    .setThumbnail(message.guild.iconURL)
    .addField("**Server Name:**", message.guild.name, true)
    .addField("**Region:**", message.guild.region, true)
    .addField("**Server Owner:**", message.guild.owner, true)
    .addField("**Owner ID:**", message.guild.owner.id, true)
    .addField("**Member Count:**", message.guild.memberCount, true)
    .addField("**Role Count:**", message.guild.roles.size, true)
    .addField("**Emoji Count:**", message.guild.emojis.size, true)
    .setFooter(`HoloHole`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
  }
}