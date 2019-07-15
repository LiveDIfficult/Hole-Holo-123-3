module.exports = async bot => {
     console.log(`${bot.user.username} is online`)
     //bot.user.setActivity(`Prefix . || Servers: ${bot.guilds.size}`, {type: "STREAMING", url:"https://www.twitch.tv/selfbot"})

    let statuses = [
        `Servers: ${bot.guilds.size} || Users: ${bot.users.size} || .help`,
        "Owner: ๖̶̶̶ζ͜͡⎞𝐋𝐢𝐯𝐞𝐝𝐢𝐟𝐟𝐢𝐜𝐮𝐥𝐭 (^_-)#6310"
    ]

    setInterval(function() {
        let status = statuses[Math.floor(Math.random() * statuses.length)];
        bot.user.setActivity(status, {type: "STREAMING", url:"https://www.twitch.tv/selfbot"});

    }, 5000)

}