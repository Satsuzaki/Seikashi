/* Annonce des constances */
const Discord = require('discord.js');
const bot = new Discord.Client()
const prefix = '$';
const YTDL = require("ytdl-core");
var servers = {};

function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if (server.queue[0]) play(connection, message);
        else connection.disconnect
    });
}

/* Lancement du Bot */
bot.on('ready', () => {
    console.log('Bot activé')
    bot.user.setGame('écouter Spotify')
});

bot.on("message", function(message) {
    if (message.author.equals(bot.user)) return;
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");
    switch (args[0].toLowerCase()) {
    case "yo":
        message.channel.send("Bonjour")
    break;
    case "play":
    if (!args[1]) {
        message.channel.sendMessage("Insérer un lien, s'il vous plait");
        return;
    }
    if (!message.member.voiceChannel) {
        message.channel.sendMessage("Rejoignez un channel vocal, s'il vous plait");
        return;
    }
    if (!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    };
    var server = servers[message.guild.id];
    
    server.queue.push(args[1]);

    if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
    });
    break;
    case "skip":
    var server = servers[message.guild.id];
    if (server.dispatcher) server.dispatcher.end();
    break;
    case "stop":
    var server = servers[message.guild.id];
    if (message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    break;
    }
});

/* Token */
bot.login("NDcwNTc3NTY2MDA5MjYyMDgw.DjkYuQ.hxe9R-sgB4mubLtVmpn9qHcYCWw")
