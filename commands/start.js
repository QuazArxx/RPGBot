const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs')

const players = require('../players.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('start')
        .setDescription('Used by new players to start their quest'),
    async execute(interaction, client) {
        players.push({
            id: interaction.user.id,
            inv: []
        })
        
        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err)
        })

        await interaction.reply({ content: `${interaction.user.username} joined the RPG adventure!`, ephemeral: false })
    }
}