const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');
const { prefix, token } = require('./config.json');

const functions = require('./functions.js');
const spawn = require('./functions.js');

let used = false;

// Declares the client and the commands for the handler
const client = new Discord.Client();
client.commands = new Discord.Collection();

const folders = fs.readdirSync('./commands'); // read the directory of folders

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);

	client.commands.set(command.name, command);
}

// When client turns on it logs that it's on
client.once('ready', async () => {
	console.log(`${client.user.username} is online!`);
});

// This is the start of the main function when the bot is turned on
client.on('message', async message => {

	// Checks if bot says a message or if not in the server
	if (message.author.bot || !message.guild) return;

	functions.getEnemy(message);
	
	// The bot will not respond if there is no prefix,
	// the user that typed it was a bot,
	// or if it was not sent from in the server
	if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return;

	// Creates the arguments variable and separates it with a space
	// and creates the command variable
	const args = message.content.slice(prefix.length).split(' ');
	const commandName = args.shift().toLowerCase();

	const command = client.commands.get(commandName) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;
	
	if (command.guildOnly && message.channel.type !== 'text') {
		return message.reply('I can\'t execute that command inside DMs!');
	}

	try {
		command.execute(message, args);
	}
	catch (error) {
		console.error(error);
		message.channel.send('There was an error trying to execute that command!\nCheck the console for details.');
	}
});

// This logs in the bot with the specified token found in config
client.login(token);