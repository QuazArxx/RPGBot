const Discord = require('discord.js');
const fs = require('fs');
const axios = require('axios');

const { rpgbot } = require('./colors.json');
const enemies = require('./Enemies.json');
const players = require('./players.json');
const items = require('./items.json');
const messages = require('./messages.js');

module.exports = {
    //players: [],
    party: [],
    enemy: [],
    chest: [],
    randomLevel: Math.floor(Math.random() * 4 + 1),
    enemySpawnChance: Math.floor(Math.random() * 100), // Percent chance
    chestSpawnChance: Math.floor(Math.random() * 100), // Percent chance

    testEnemySpawn: function (message) {
        const randomEnemy = enemies[Math.floor(Math.random() * enemies.length)];
        if (!(this.enemy.length == 0)) return;

        this.enemy.push(randomEnemy);

        this.enemy.level = this.randomLevel;
        
        const enemySpawn = new Discord.MessageEmbed()
        .setColor(rpgbot)
        .setTitle(`A level ${randomEnemy.level} ${randomEnemy.name} appeared!`)

        message.channel.send(enemySpawn);
    },

    generateEnemy: async function () {
        try {
            return await axios({
                method: 'post',
                url: 'https://freydoapps.com/api/rpgBot/insertMonster.php',
                data: {
                    
                }
            })
        } catch (error) {
            console.error(error);
        }
    },

    /*getEnemy: async function (message) {
        let enemy = await this.generateEnemy();

        if (this.party.some(type => type.type == 'monster')) return;

        this.party.push({
            name: monster.data[0].name,
            level: monster.data[0].level,
            type: 'monster',
            hp: monster.data[0].HP
        });

        const embed = new Discord.MessageEmbed()
        .setColor(rpgbot)
        .setTitle(`A level ${monster.data[0].level} ${monster.data[0].name} appeared!`)
        .addField(`Type r!join to join the fight!`)

        setTimeout(function() {
            if (!(this.party.some(t => t.type == 'player'))) {
                message.channel.send(`${monster.data[0].name} got away!`)
                this.party.length = 0;
            } else {
                message.channel.send('Let the fight begin!');
            }
        }.bind(this), 10000);

        message.channel.send(embed);
        
    },*/

    spawnChest: function(message) {
        if (!(this.chest.length == 0)) {
            this.chest.length = 0;
        }
        
        this.fillChest();
        message.channel.send(messages.chestSpawn);

        setTimeout(function() {
            if (!(this.chest.length == 0)) {
                message.channel.send(messages.chestDisappeared);
                this.chest.length = 0;
            }
        }.bind(this), 30000);
    },

    fillChest: function() {
        this.chest.length = 0;
        let chestItemCount = Math.floor(Math.random() * 4 + 1);

        let randomAmount;
        let randomItem;
        for (let x = 0; x < chestItemCount; x++) {
            // Keeps getting a random item until it's not in the chest yet
            do {
                randomItem = items[Math.floor(Math.random() * items.length)];
            } while(this.chest.some(i => i.item == randomItem))
            
            randomAmount = Math.floor(Math.random() * 4 + 1);

            // Adds the item a random number of times into the chest
            this.chest.push({
                item: randomItem,
                amount: randomAmount
            });
        }
    }
};