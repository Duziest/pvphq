
const antispam = require("discord-anti-spam");
const Discord = require("discord.js");
const fs = require("fs");
const botSettings = require("./botSettings.json")
const client = new Discord.Client({disableEveryone: true});
client.commands = new Discord.Collection();
const bot = new Discord.Client({disableEveryone: true})
bot.commands = new Discord.Collection();
const YouTube = require('simple-youtube-api');
const ytdl = require('ytdl-core');
const youtube = new YouTube("AIzaSyAfIu0OjJtPz4-lpYtR-zTYvipNcnMist4");
const queue = new Map();
var opusscript = require("opusscript");
var servers = {};
var prefix = "+";
const lblue = "#ADD8E6";
//const ms = require("ms");

fs.readdir("./commands/", (err, files) => {
    
    if (err) console.log(err)

    let jsfile = files.filter(f => f.split(".").pop() === "js");
    if (jsfile.length <= 0){
        console.log("Couldn't find any commands.");
        return;
    }

    jsfile.forEach((f, i) =>{
        let props = require(`./commands/${f}`);
        client.commands.set(props.help.name, props)
    });
});

client.on("message", async message => {
    if(message.author.bot) return;
    if(message.channel.type === "dm") return;

    let prefix = botSettings.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if(!message.content.startsWith(prefix)) return;
    let commandfile = client.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(bot, message, args);

})

client.on("message", async message => {
	var args = message.content.substring(prefix.length).split(" ");
    if (!message.content.startsWith(prefix)) return;

  
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;
  let messageArray = message.content.split(" ");
 let cmd = messageArray[0];
	switch (args[0].toLowerCase()) {
		case "say":
if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("You're not an admin!");
await message.delete();
let embed = new Discord.RichEmbed()
.setDescription(args.join(" ").slice(3))
.setTimestamp()
.setFooter(`Announced by ${message.member.user.username}`)
.setColor("#FFFFF");

message.channel.send(embed);
break; 
case "help":
let helpEmbed = new Discord.RichEmbed()
.addField("**Commands**",
"** **")
.addField(`+say [message]`, "Have the bot say something using RichEmbed.")
.addField("+help", "Displays this message.")
.addField("+purge", "Delete several messages at once.")
.addField("+mute", "Mute a user.")
.addField("+tempmute", "Temporally mute a user.")
.addField("+unmute", "Unmute a user.")
.addField("+new", "Create a ticket for support.")
.addField("+close", "Close an open ticket.")
.setColor("#ADD8E6")
.setFooter(`Coded by Duziest#5488 | ${botSettings.name}`);
message.channel.send(helpEmbed);
break;
case "devleave":
    if(!message.member.id === "453730756636704768") return message.channel.send("Nope.");
await message.channel.send("Leaving. Bye!");
message.guild.leave();
break;
}
});

client.on("ready", async () => {
	console.log(`${client.user.username} is online on ${client.guilds.size} servers!`);
	client.user.setActivity(`${botSettings.prefix}help | play.pvphq.net`, {type: "WATCHING"});
  });

client.login(process.env.BOT_TOKEN);
