const { SlashCommandBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('test')
        .setDescription('Command for testing new things')
        .setDefaultMemberPermissions(0),
    async execute(interaction, client) {
        
    }
}