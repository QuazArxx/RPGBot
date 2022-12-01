const { EmbedBuilder } = require('discord.js')
const fs = require('node:fs')

const { rpgbot } = require('./colors.json')
const enemies = require('./Enemies.json')
const players = require('./players.json')
const items = require('./items.json')
const chest = require('./chest.json')

const messages = require('./messages.js')

module.exports = {
    //players: [],
    party: [],
    enemy: [],
    randomLevel: Math.floor(Math.random() * 4 + 1),
    enemySpawnChance: Math.floor(Math.random() * 100), // Percent chance
    chestSpawnChance: Math.floor(Math.random() * 100), // Percent chance

    /*testEnemySpawn: function (message) {
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        if (!(this.enemy.length == 0)) return;

        this.enemy.push(randomEnemy);

        this.enemy.level = this.randomLevel;
        
        const enemySpawn = new Discord.MessageEmbed()
        .setColor(rpgbot)
        .setTitle(`A level ${randomEnemy.level} ${randomEnemy.name} appeared!`)

        message.channel.send(enemySpawn);
    },*/


    /*getEnemy: async function (message) {
        let monster = await this.generateEnemy();

        if (!(this.enemy.length == 0)) return;

        this.enemy.push({
            name: monster.data.name,
            level: monster.data.level,
            type: 'monster',
            hp: monster.data.HP,
            def: monster.data.DEF,
            xp: monster.data.XP
        });

        const embed = new Discord.MessageEmbed()
        .setColor(rpgbot)
        .setTitle(`A level ${monster.data.level} ${monster.data.name} appeared!`)
        .addField(`Type r!join to join the fight!`, '\u200B')

        setTimeout(function() {
            if (!(this.party.some(t => t.type == 'player'))) {
                message.channel.send(`${monster.data.name} got away!`)
                this.party.length = 0;
            } else {
                message.channel.send('Let the fight begin!');
            }
        }.bind(this), 10000);

        message.channel.send(embed);
        
    },*/

    fillChest: function () {
        chest.length = 0

        let chestItemCount = Math.floor(Math.random() * 4 + 1)

        let randomAmount
        let randomItem
        for (let x = 0; x < chestItemCount; x++) {
            // Keeps getting a random item until it's not in the chest yet
            do {
                randomItem = items[Math.floor(Math.random() * items.length)]
            } while(chest.some(i => i.item == randomItem))
            
            randomAmount = Math.floor(Math.random() * 4 + 1)

            // Adds the item a random number of times into the chest
            chest.push({
                item: randomItem,
                amount: randomAmount
            })
            return chest
        }

        fs.writeFile('./chest.json', JSON.stringify(chest), err => {
            if (err) console.error(err)
        })

        return console.log(chest.length)
    },

    showChest: function (interaction) {
        interaction.reply({ content: `${chestArray.length}` })
    },

    spawnChest: async function (interaction) {
        this.fillChest
        await interaction.reply({ embeds: [messages.chestSpawn] })
    }
}