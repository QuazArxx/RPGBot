const { SlashCommandBuilder } = require('discord.js')

const functions = require('../functions.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('Clears the chest, party, or enemy')
        .setDefaultMemberPermissions(0)
        .addStringOption(options =>
            options.setName('group')
            .setDescription('Group to clear')
            .setRequired(true)
            .addChoices(
                { name: 'Chest', value: '\u200B' },
                { name: 'Party', value: '\u200B' },
                { name: 'Enemy', value: '\u200B' }
            )),
    async execute(interaction, client) {
        const group = interaction.options.getString('group')

        switch (group) {
            case 'Chest':
                functions.chest.length = 0
                return interaction.reply({ content: 'Chest cleared successfully.', ephemeral: true })
                break;
            case 'Party':
                functions.party.length = 0
                return interaction.reply({ content: 'Party cleared successfully', ephemeral: true })
                break;
            case 'Enemy':
                functions.enemy.length = 0
                return interaction.reply({ content: 'Enemy cleared successfully', ephemeral: true })
                break;
            default:
                break;
        }
    }
}