const Discord = require('discord.js');
const fs = require('fs');

const { TOKEN } = require('./config'); // make sure you add your bot's token in the ./config file

const prefixes = require("./jsons/prefixes.json");

const client = new Discord.Client();

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if(err) console.log(err);
  let jsfile = files.filter(f => f.split(".").pop() === "js");
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }
  jsfile.forEach((f, i) =>{
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded`);
    client.commands.set(props.help.name, props);
  });
});


client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log(`${client.user.username} is onlne`));

  client.on('ready', () => {
	client.user.setActivity(`testing Template-bot`, { type: "PLAYING" });
	 //you can edit this to whatever you want, but remember the type can only be "PLAYING", "WATCHING", "LISTENING", or "STREAMING"
});

client.on('disconnect', () => console.log('I just disconnected, making sure you know'));

client.on('reconnecting', () => console.log('I will reconnect now...'));

client.on('message', async message => { 
	if (message.author.bot)return;
	if (message.content.startsWith("<default>") && message.channel.type !== "text")return mesage.reply("Please use my commands in a server");
								//just edit ^^this^^ to your default prefix .. all it does is make it so when ppl use the bot in a dm, it tells them to use commands in a server
								
    if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: "<your custom prefix>"  //this is the default prefix (you can set it to whatever you want)
    };
  }
   const prefix = prefixes[message.guild.id].prefixes;
  
  if(!message.content.startsWith(prefix))return;
  
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = client.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(client,message,args);
  
});

client.login(TOKEN);