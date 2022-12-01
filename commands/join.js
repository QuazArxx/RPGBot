const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

const { rpgbot } = require('../colors.json');
const { party, enemy } = require('../functions.js');
const players = require('../players.json');
const messages = require('../messages.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('join')
		.setDescription('Used to join the grouping of players to fight an enemy that spawns'),
	async execute(interaction, client) {
		if (!(players.some(user => user.id === interaction.user.id))) return interaction.reply({ content: `${messages.startAdventure}`, ephemeral: true })

		if (enemy.length == 0) return interaction.reply({ content: 'There\'s no enemy to fight!', ephemeral: true })
		if (party.some(user => user.id === interaction.user.id)) return interaction.reply({ content: 'You already joined the current fight!', ephemeral: true });

		// TODO add users stats 
		party.push({
			type: 'player',
			name: interaction.user.username,
			id: interaction.user.id
		})

		// TODO add current level of the user
		const embed = new EmbedBuilder()
		.setColor(rpgbot)
		.setTitle(`${interaction.user.username} joined the fight!`)

		await interaction.reply({ embeds: [embed], ephemeral: false })
	}
}