const Discord = require('discord.js');
const fs = require('fs');

const { rpgbot } = require('../colors.json');
const party = require('../functions.js');

module.exports = {
	name: 'join',
	description: 'Used to join the grouping of players to fight an enemy that spawns',
	execute(message, args) {

		if (party.party.length == 0) return message.channel.send('There\'s no enemy to fight!');
		if (party.party.some(user => user.id === message.author.id)) return message.channel.send('You already joined the current fight!');

		// TODO check if player is in the player list array in functions.js
		// TODO add users stats 
		party.party.push({
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