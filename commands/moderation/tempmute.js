const { RichEmbed } = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { ms } = require("ms");
module.exports = {
  config: {
      name: "tempmute",
      aliases: ["unm", "tspeak"],
      usage: "<user> <time> <reason>",
      category: "moderation",
      description: "Tempmuted a member in the discord!",
      accessableby: "Members"
  },
  run: async (bot, message, args) => {

  //!tempmute @user 1s/m/h/d

  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
  if(!tomute) return message.channel.send(":x: Please, supply the user");

  let reason = args.slice(2).join(" ");
   if(!reason) reason = "No reason given!"

  if(!message.member.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send(":x: You do not have permissions to use this command, Missing permissions: `MANAGE_ROLES`")
  
  if(tomute.hasPermission("MANAGE_ROLES", "ADMINISTRATOR") || !message.guild.owner) return message.channel.send(":x: You can not mute this person");

  if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send(":x: I do not have permission to perform this command, Missing permissions: `MANAGE_ROLES`")
  message.delete()
  let muterole = message.guild.roles.find(`name`, "Muted");
  //start of create role
  if(!muterole){
    try{
      muterole = await message.guild.createRole({
        name: "Muted",
        color: "#000000",
        permissions:[]
      })
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false,
            SEND_TTS_MESSAGES: false,
            ATTACH_FILES: false,
            SPEAK: false
        });
      });
    }catch(e){
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args[1];
  if(!mutetime) return message.channel.send(":x: You didn't specify a time");

  tomute.addRole(muterole.id);
  tomute.send(`Hi, you got a tempmuted on the server **${message.guild.name},** on time: **${ms(ms(mutetime))},** ${reason}`).catch(err => console.log(err))

let embed = new Discord.RichEmbed()
.setColor("#fae034")
.setTitle("Success Tempmuted")
.setThumbnail(message.guild.iconURL)
.addField("Type:", "**Tempmute**", true)
.addField("Author Command", message.author.username, true)
.addField("Tempmuted User:", tomute.user.username, true)
.addField("Reason", reason, true)
.addField("On Time:", ms(ms(mutetime)), true)
.addField("Date:", message.createdAt.toLocaleString(), true)

message.channel.send(embed);

  setTimeout(function(){
    tomute.removeRole(muterole.id);
    tomute.send(`Hi, you got a unmuted`)
  }, ms(mutetime));


//end of module
}
}