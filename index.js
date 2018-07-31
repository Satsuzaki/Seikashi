/* Annonce des constances */
const Discord = require('discord.js')
const bot = new Discord.Client()
const prefix = '$';

/* Lancement du Bot */
bot.on('ready', () => {
    console.log('Bot activé')
    bot.user.setGame('être en développement')
});

/* Commandes Utiles */
bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
        /*case "roll":
        let message = msg.content.split(" ");
		let maxval = parseInt(message[1]);
		if ((maxval > 10000) || (maxval < 1)) {
			return msg.reply('You cannot roll more than 10000 or less than 1!')
		}
		let min = Math.ceil(0);
		let max = Math.floor(maxval);
		return msg.channel.send(Math.floor(Math.random() * (max - min) + min));
        break;*/
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
