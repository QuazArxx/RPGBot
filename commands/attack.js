const { SlashCommandBuilder } = require('discord.js')
const fs = require('node:fs')

const { party, enemy } = require('../functions.js')
const players = require('../players.json')
const messages = require('../messages.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('attack')
        .setDescription('Attacks the enemy that spawned.'),
    async execute(interaction, client) {
        // Check if user has started the adventure
        if (!(players.some(user => user.id === interaction.user.id))) return message.channel.send(messages.startAdventure)

        // Check if user is in the attacking party
        if (!(party.some(user => user.id === interaction.user.id))) return message.channel.send(messages.notInParty)

        let userAttack = 0
        // Get users attack stat
        for (let x = 0; x < players.length; x++) {
            if (players[x].id == interaction.user.id) {
                userAttack = players[x].atk
            }
        }

        // Compare attack stat to defense stat of enemy
        if (enemy[0].def > userAttack) return interaction.reply({ content: messages.enemyDef, ephemeral: false })

        // TODO add stat altering critChance
        // Check for critical hit
        let critHit = false
        let critChance = Math.floor(Math.random() * 100)

        if(critChance > 95) critHit = true

        // TODO make damage a range
        // Calculate damage and apply to enemy HP
        let damage = 0
        if (critHit) {
            damage = userAttack / enemy[0].def * 1.5
        } else {
            damage = userAttack / enemy[0].def
        }

        enemy[0].hp -= damage;

        await interaction.reply({ content: `${interaction.user.username} dealt ${damage} damage to the ${enemy[0].name}!`, ephemeral: false })


        // Adds exp to every player in the party if the monster is defeated
        if (enemy[0].hp <= 0) {
            interaction.reply({ content: `${enemy[0].name} defeated! You gained ${enemy[0].xp} experience!`, ephemeral: false })
            for (x = 0; x < party.length; x++) {
                for (y = 0; y < players.length; y++) {
                    if (party[x].id == players[y].id) {
                        players[y].exp += enemy[0].xp
                    }
                }
            }

            enemy.length = 0
            party.length = 0

        } else {
            interaction.reply({ content: `${enemy[0].name} has ${enemy[0].hp}HP left.`, ephemeral: false })
        }

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err)
        })
    }
}