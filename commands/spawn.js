const { SlashCommandBuilder } = require('discord.js')
const { spawnChest } = require('../functions')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('spawn')
        .setDescription('Spawns a chest or enemy')
        .setDefaultMemberPermissions(0)
        .addStringOption(option =>
            option.setName('group')
            .setDescription('Group to Spawn')
            .setRequired(true)
            .addChoices(
                { name: 'Chest', value: 'chest' },
                { name: 'Enemy', value: 'enemy' }
            )),
    async execute(interaction, client) {
        let whatToSpawn = interaction.options.getString('group')

        if(whatToSpawn == 'chest') {
            spawnChest(interaction)
        }
    }
}