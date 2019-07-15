const discord = require("discord.js")

module.exports = {
    config: {
        name: "ping",
        aliases: ["latency"],
        usage: "",
        category: "miscellaneous",
        description: "PONG! Display the api and bot latency",
        accessableby: "Members"
    },
run: async (bot, message, args) => {

    message.channel.send("Pinging...").then(m => {
        let ping = m.createdTimestamp = message.createdTimestamp
        let choices = ["Is this really my ping", "Is it okay? I cant look", "I hope it isnt bad"]
        let response = choices[Math.floor(Math.random() *  choices.length)]

        m.edit(`${response}: Bot Latency: ${ping}, API Latency: ${Math.round(bot.ping)}`)
    })

}
}