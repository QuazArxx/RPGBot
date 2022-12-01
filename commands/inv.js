const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

const players = require('../players.json')
const colors = require('../colors.json')
const messages = require('../messages.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('inv')
        .setDescription('Displays users inventory')
        .setDefaultMemberPermissions(0)
        .addUserOption(options =>
            options.setName('target')
            .setDescription('Person whose inventory you want to see')
            .setRequired(true)),
    async execute(interaction, client) {
        if (!(players.some(user => user.id === interaction.user.id))) return interaction.reply({ content: `${messages.startAdventure}` })

        let userInv;
        for (let x = 0; x < players.length; x++) {
            if (players[x].id == message.author.id) {
                userInv = players[x];
            }
        }

        if (userInv.inv.length == 0) {
            const embed = new EmbedBuilder()
            .setColor(colors.error)
            .setTitle(`${interaction.user.username}'s inventory is empty!`)

            return interaction.reply({ embeds: [embed], ephemeral: true })
        }

        let invMessage = '';
        for (let x = 0; x < userInv.inv.length; x++) {
            invMessage += `${userInv.inv[x].item} X${userInv.inv[x].amount}\n`
        }

        const embed = new EmbedBuilder()
        .setColor(colors.rpgbot)
        .setTitle(`__${message.author.username}'s Inventory:__`)
        .addField('\u200B', invMessage)

        await interaction.reply({ embeds: [embed], ephemeral: true })
    }
}