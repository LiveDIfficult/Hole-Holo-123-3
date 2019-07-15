const { RichEmbed} = require("discord.js")
const { prefix } = require("../../botconfig.json");

module.exports = {
    config: {
        name: "purge",
        aliases: ["p", "clear", "c"],
        usage: "<number>",
        category: "moderation",
        description: "Clears messages in the discord!",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {

 message.delete()
 
   if(!args[0]) return message.channel.send(":x: Please enter the quantity")

   if(!message.member.hasPermissions(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(":x: You do not have permissions to use this command, Missing permissions: `MANAGE_MESSAGES`")

   if(!message.guild.me.hasPermission(["MANAGE_MESSAGES", "ADMINISTRATOR"])) return message.channel.send(":x: I do not have permission to perform this command, Missing permissions: `MANAGE_MESSAGES`")
   message.channel.bulkDelete(args[0]).then(() => {
       let embed = new Discord.RichEmbed()
       .setColor("#fae034")
       .setTitle("Success cleared messages")
       .setDescription(`Number of cleared messages: ${args[0]}`);
       message.channel.send(embed).then(msg => msg.delete(5000));
   })

}
}