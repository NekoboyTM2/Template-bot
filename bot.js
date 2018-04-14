const { Client, Collection } = require('discord.js');
const { TOKEN, PREFIX } = require('./config');
const client = new Client();
const fs = require('fs');

client.commands = new Collection();
client.helpcommands = new Collection();

fs.readdir('./commands/', (err, files) => {
	if (err) console.log(err);
	let jsfile = files.filter(file => file.split('.').pop() === 'js');
	if (jsfile.length <= 0) {
		console.log("Couldn't find commands.");
		return;
	}

	jsfile.forEach(file => {
		let props = require(`./commands/${file}`);
		console.log(`${file} loaded`);
		client.commands.set(props.help.name, props);
	});
});

client.on('warn', console.warn);

client.on('error', console.error);

client.on('ready', () => console.log(`${client.user.username} is onlne`));

client.on('ready', () => client.user.setActivity(`smth gud ig`, { type: 'PLAYING' })); // you can edit this to whatever you want, but remember the type can only be "PLAYING", "WATCHING", "LISTENING", or "STREAMING"

client.on('disconnect', () => console.log('I just disconnected, making sure you know'));

client.on('reconnecting', () => console.log('I will reconnect now...'));

client.on('message', message => {
	if (message.author.bot) return undefined;
	if (!message.content.startsWith(PREFIX)) return;
	if (message.content.startsWith(PREFIX) && message.channel.type !== 'text') return message.reply('Please use my commands in a server');
	// just edit ^^this^^ to your default prefix

	let prefixes = JSON.parse(fs.readFileSync('./jsons/prefixes.json', 'utf8'));

	if (!prefixes[message.guild.id]) prefixes[message.guild.id] = { prefixes: PREFIX };

	const prefix = prefixes[message.guild.id].prefixes;

	// i just added the ping command here instead of making another file in ./commands
	if (message.content === `${prefix}ping`) {
		message.channel.send('pong');
		message.channel.send('Pinging...').then(sent => {
			sent.edit(`my ping - ${sent.createdTimestamp - message.createdTimestamp}ms`);
			console.log(`ping command has been used by ${message.author.username} in ${message.guild}`);
		});
	}

	if (!message.content.startsWith(prefix)) return;

	let messageArray = message.content.split(' ');
	let cmd = messageArray[0];
	let args = messageArray.slice(1);

	let commandfile = client.commands.get(cmd.slice(prefix.length));
	if (commandfile) commandfile.run(client, message, args);
});

client.login(TOKEN);
