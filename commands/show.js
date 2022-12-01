const { SlashCommandBuilder } = require('discord.js')

const functions = require('../functions.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('show')
        .setDescription('Shows the chest contents')
        .setDefaultMemberPermissions(0),
    async execute(interaction, client) {
        interaction.reply({ content: `${JSON.stringify(functions.chest, null, 4)}` })
    }
}