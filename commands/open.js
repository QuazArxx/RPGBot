const Discord = require('discord.js');
const fs = require('fs');

const functions = require('../functions.js');
const messages = require('../messages.js');
const players = require('../players.json');
const colors = require('../colors.json');

module.exports = {
    name: 'open',
    description: 'Used to open a chest that spawned',
    execute(message, args) {
        if (!(players.some(user => user.id === message.author.id))) return message.channel.send(messages.startAdventure);
        if (functions.chest.length == 0) return message.channel.send('A chest hasn\'t spawned yet!');

        // Get's the players information
        var unlockingPlayer;
        for (let x = 0; x < players.length; x++) {
            if (players[x].id == message.author.id) {
                unlockingPlayer = players[x];
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
                            unlockingPlayer.inv[y].amount += functions.chest[x].amount;
                        }
                    }
                } else {
                    unlockingPlayer.inv.push({
                        item: functions.chest[x].item,
                        amount: functions.chest[x].amount
                    });
                }
            }
        }

        

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err);
        });

        let chestMessage = '';
        for (let x = 0; x < functions.chest.length; x++) {
            chestMessage += `${functions.chest[x].item} X${functions.chest[x].amount}\n`
        }

        const embed = new Discord.MessageEmbed()
        .setColor(colors.rpgbot)
        .setTitle(`${message.author.username} opened the chest!`)
        .addField('You found:\n\n', chestMessage)

        functions.chest.length = 0;

        message.channel.send(embed);
    }
}