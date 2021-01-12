const Discord = require('discord.js');
const fs = require('fs');
const axios = require('axios');

const { rpgbot } = require('./colors.json');

module.exports = {
    players: [],
    party: [],
    randomLevel: Math.floor(Math.random() * 4 + 1),

    requestAPI: async function () {
        try {
            return await axios.get('https://freydoapps.com/api/testAPI/');
        } catch (error) {
            console.error(error);
        }
    },

    generateMonster: async function () {
        try {
            return await axios.get(`https://freydoapps.com/api/rpgBot/generateMonster.php?level=${this.randomLevel}`);
        } catch (error) {
            console.error(error);
        }
    },

    getEnemy: async function (message) {
        let monster = await this.generateMonster();

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
    }
};