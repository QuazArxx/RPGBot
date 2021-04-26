const fs = require('fs');
const Discord = require('discord.js');
const axios = require('axios');
const { prefix, token } = require('./config.json');

const functions = require('./functions.js');

let used = false;

// Declares the client and the commands for the handler
const client = new Discord.Client();
client.commands = new Discord.Collection();

const folders = fs.readdirSync('./commands'); // read the directory of folders

// Sets how to find the subfolders with commands
for (var folder of folders) {
    const files = fs.readdirSync(`./commands/${folder}`); // for each folder, read the files in the folder
    for (var file of files) {
        const command = require(`./commands/${folder}/${file}`); // for each file, set the command
        client.commands.set(command.name, command);
    }
}

// When client turns on it logs that it's on
client.once('ready', async () => {
	console.log(`${client.user.username} is online!`);
});

// This is the start of the main function when the bot is turned on
client.on('message', async message => {

	// Checks if bot says a message or if not in the server
	if (message.author.bot || !message.guild) return;

	if (message.author.id == '387959359394807808' && message.content.toLowerCase() == 'enemy') functions.getEnemy(message);
	if (message.author.id == '387959359394807808' && message.content.toLowerCase() == 'chest') functions.spawnChest(message);

	if (functions.enemySpawnChance > 0 && functions.enemySpawnChance <= 5) {
		functions.getEnemy(message);
	}	
	if (functions.chestSpawnChance > 0 && functions.chestSpawnChance <= 5) {
		functions.spawnChest(message);
	}

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