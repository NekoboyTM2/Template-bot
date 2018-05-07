const Discord = require("discord.js");
const prefixes = require("../jsons/prefixes.json");

module.exports.run = async (client,message,args) => {
const prefix = prefixes[message.guild.id].prefixes;
const uwu = message.content.split(" ").slice(1).join(" ");

if (!uwu) {	
    const RichEmbed = new Discord.RichEmbed()
    .setColor(`${message.member.displayHexColor}`)
    .setTimestamp()
    .setThumbnail(client.user.avatarURL)
    .setTitle(`help for ${client.user.username}`)
    .addField('**Misc commands:**', '`ping` `invite`')
    .addField('**Moderation commands:**', '`setprefix`')
    .addField('**More help:**', 'for more help type ```'+ prefix +'help <command>```')	 
    .setDescription(`here are my commands`)
    .setFooter(`Requested by: ${message.member.displayName}`, `${message.author.avatarURL}`)
    message.channel.send({embed: RichEmbed});
    console.log(`help command has been used by ${message.author.username} in ${message.channel.guild}`);
}
if (uwu == "ping"){
	  let helpbed = new Discord.RichEmbed()
	  .setColor(`${message.member.displayHexColor}`)
	  .setTitle('ping help')
	  .setDescription('pongs the bot and sends ping time in ms')
	  .addField('**Useage:**', `${prefix}ping`)
	  message.channel.send(helpbed);
	  console.log(`sent ping help to ${message.member.displayName} in the server ${message.guild}`);
}
if (uwu == "invite"){
	let helpbed = new Discord.RichEmbed()
	  .setColor(`${message.member.displayHexColor}`)
	  .setTitle('invite help')
	  .setDescription('sends an embed with the bot invite url in it')
	  .addField('**Useage:**', `${prefix}invite`)
	  message.channel.send(helpbed);
	  console.log(`sent invite help to ${message.member.displayName} in the server ${message.guild}`);
}
if (uwu == "setprefix"){
	let helpbed = new Discord.RichEmbed()
	  .setColor(`${message.member.displayHexColor}`)
	  .setTitle('Prefix help')
	  .setDescription('sets the guild prefix to something else')
	  .addField('**Useage:**', `${prefix}setprefix <new prefix>`)
      .addField('**Example:**', `${prefix}setprefix ;~;`)
	  .addField('**Pemissions required:**', '`ADMINISTRATOR`')
	  message.channel.send(helpbed);
	  console.log(`sent prefix help to ${message.member.displayName} in the server ${message.guild}`);
}


}
module.exports.help = {
	name: "help"
}