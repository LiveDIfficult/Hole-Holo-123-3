const Discord = require("discord.js")

module.exports = {
    config: {
        name: "botinfo",
        aliases: ["bi"],
        usage: "",
        category: "miscellaneous",
        description: "Display bot information",
        accessableby: "Members"
    },
run: async (bot, message, args) => {

    message.delete()
    let embed = new Discord.RichEmbed()
    .setColor("#5291f7")
    .setTitle("Bot Info")
    .setThumbnail(message.guild.iconURL)
    .addField("Owner:", "๖̶̶̶ζ͜͡⎞𝐋𝐢𝐯𝐞𝐝𝐢𝐟𝐟𝐢𝐜𝐮𝐥𝐭 (^_-)", true)
    .addField("Owner Discriminator:", "#6310", true)
    .addField("Owner ID:", "470926065448124428", true)
    .addField("Bot Username:", "HoloHole", true)
    .addField("Bot Discriminator:", "#8981", true)
    .addField("Bot ID:", "590589258272866305", true)
    .addField("Created:", `${bot.user.createdAt}`, true)
    message.channel.send(embed)
}
}