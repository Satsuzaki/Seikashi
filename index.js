/* Annonce des constances */
const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = '$';

/* Lancement du Bot */
bot.on('ready', () => {
    console.log('Bot activé')
    bot.user.setGame(' ')
});

/* Commandes Utiles */
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) { 
        case "8ball":
        let args = message.content.split(" ").slice(1);
        let tte = args.join(" ")
        if (!tte){
        return message.reply("Merci une question :8ball:")};

        var replys = [
            "Oui",
            "Non",
            "Je ne sais pas",
            "Peut-être"
        ];
        let reponse = (replys[Math.floor(Math.random() * replys.length)])
        var bembed = new Discord.RichEmbed()
        .setDescription("**__:8ball: 8ball__**")
        .addField("__Question:__", tte)
        .addField("__Réponse:__", reponse)
        message.channel.sendEmbed(bembed)
    }
})

/* Token */
bot.login(process.env.TOKEN);
