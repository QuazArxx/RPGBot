const Discord = require('discord.js');

const { rpgbot } = require('../colors.json');
const { party, enemy } = require('../functions.js');
const players = require('../players.json');
const messages = require('../messages.js');

module.exports = {
	name: 'join',
	description: 'Used to join the grouping of players to fight an enemy that spawns',
	aliases: 'j',
	execute(message, args) {
		if (!(players.some(user => user.id === message.author.id))) return message.channel.send(messages.startAdventure);

		if (enemy.length == 0) return message.channel.send('There\'s no enemy to fight!');
		if (party.some(user => user.id === message.author.id)) return message.channel.send('You already joined the current fight!');

		// TODO add users stats 
		party.push({
			type: 'player',
			name: message.author.username,
			id: message.author.id
		})

		// TODO add current level of the user
		const embed = new Discord.MessageEmbed()
		.setColor(rpgbot)
		.setTitle(`${message.author.username} joined the fight!`)

		message.channel.send(embed);
	},
};