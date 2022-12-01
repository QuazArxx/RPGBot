const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const fs = require('node:fs')

const functions = require('../functions.js')
const messages = require('../messages.js')
const players = require('../players.json')
const colors = require('../colors.json')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('open')
        .setDescription('Used to open a chest that spawned'),
    async execute(interaction, client) {
        if (!(players.some(user => user.id === interaction.user.id))) return interaction.reply({ content: `${messages.startAdventure}`, ephemeral: true })
        if (functions.chest.length == 0) return interaction.reply({ content: 'A chest hasn\'t spawned yet!', ephemeral: true })

        // Get's the players information
        let unlockingPlayer
        for (let x = 0; x < players.length; x++) {
            if (players[x].id == interaction.user.id) {
                unlockingPlayer = players[x]
            }
        }

        // Checks if the players inventory is empty
        if (unlockingPlayer.inv.length == 0) {
            for (let x = 0; x < functions.chest.length; x++) {
                unlockingPlayer.inv.push({
                    item: functions.chest[x].item,
                    amount: functions.chest[x].amount
                })
            }
        } else {
            // Checks if the player already has the item first
            for (let x = 0; x < functions.chest.length; x++) {
                if (unlockingPlayer.inv.some(i => i.item == functions.chest[x].item)) {
                    for (let y = 0; y < unlockingPlayer.inv.length; y++) {
                        if (functions.chest[x].item == unlockingPlayer.inv[y].item) {
                            unlockingPlayer.inv[y].amount += functions.chest[x].amount
                        }
                    }
                } else {
                    unlockingPlayer.inv.push({
                        item: functions.chest[x].item,
                        amount: functions.chest[x].amount
                    })
                }
            }
        }

        

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err)
        })

        let chestMessage = '';
        for (let x = 0; x < functions.chest.length; x++) {
            chestMessage += `${functions.chest[x].item} X${functions.chest[x].amount}\n`
        }

        const embed = new EmbedBuilder()
        .setColor(colors.rpgbot)
        .setTitle(`${interaction.user.username} opened the chest!`)
        .addFields(
            { name: 'You found:', value: '\u200B' },
            { name: '\u200B', value: '\u200B' },
            { name: '\u200B', value: `${chestMessage}` }
        )

        functions.chest.length = 0

        await interaction.reply({ embeds: [embed], ephemeral: false })
    }
}