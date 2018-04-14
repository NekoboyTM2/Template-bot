const Discord = require("discord.js");
const fs = require("fs");

module.exports.run = async (client,message,args) => {

  let prefixes = JSON.parse(fs.readFileSync("./jsons/prefixes.json", "utf8"));
  const prefix = prefixes[message.guild.id].prefixes;

  if(!message.member.hasPermission("ADMINISTRATOR"))return message.reply('you need the "`ADMINISTRATOR`" permission to use this');
  if (args[0] === "help") {
	  let helpbed = new Discord.RichEmbed()
	  .setColor(`${message.member.displayHexColor}`)
	  .setTitle('Prefix help')
	  .addField('**Useage:**', `${prefix}setprefix <new prefix>`)
      .addField('**Example:**', `${prefix}setprefix ;~;`)
	  message.channel.send(helpbed);
	  console.log(`sent prefix help to ${message.member.displayName} in the server ${message.guild}`);
  } else {

  prefixes[message.guild.id] = {
    prefixes: args[0]
  };

  fs.writeFile("./jsons/prefixes.json", JSON.stringify(prefixes), (err) => {
    if (err) console.log(err)
  });

  
  message.channel.send(`New server prefix set to ${args[0]}`).then(msg => {msg.delete(10000)}); //10000 is 10 seconds
  console.log(`${message.member.displayName} set the prefix for ${message.guild} to ${args[0]}`);

  }

}
module.exports.help = {
  name: "setprefix"
}
