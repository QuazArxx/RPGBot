const { SlashCommandBuilder } = require('discord.js')

const players = require('../players.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Used by new players to start their quest'),
    async execute(interaction, client) {
        players.push(interaction.user.id)

        await interaction.reply({ content: `${message.author.username} joined the RPG adventure!`, ephemeral: false })
    }
}