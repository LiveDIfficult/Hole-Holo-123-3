const Discord = require("discord.js")
const { prefix } = require("../../botconfig.json");
module.exports = {
    config: {
        name: "userinfo",
        aliases: ["ui"],
        usage: "",
        category: "miscellaneous",
        description: "Displays user information",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

    message.delete()
    let sEmbed = new Discord.RichEmbed()
    .setColor("#e84d15")
    .setTitle("User Info")
    .setThumbnail(message.guild.iconURL)
    .addField("**User Name:**", `${message.author.username}`, true)
    .addField("**User Discriminator:**", `${message.author.discriminator}`, true)
    .addField("**User ID:**", `${message.author.id}`, true)
    .addField("**Status:**", `${message.author.presence.status}`, true)
    .addField("**Created At:**", `${message.author.createdAt}`, true)
    .setFooter(`HoloHole`, bot.user.displayAvatarURL);
    message.channel.send(sEmbed);
}
}