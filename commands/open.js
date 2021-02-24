const fs = require('fs');

const functions = require('../functions.js');
const messages = require('../messages.js');
const players = require('../players.json');

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
        }

        // Checks if the player already has the item first
        for (let x = 0; x < unlockingPlayer.inv.length; x++) {
            for (let y = 0; y < functions.chest.length; y++) {
                if (unlockingPlayer.inv[x].item == functions.chest[y].item) {
                    unlockingPlayer.inv[x].amount += functions.chest[y].amount;
                } else {
                    unlockingPlayer.inv.push({
                    item: functions.chest[y].item,
                    amount: functions.chest[y].amount
                    });
                }
            }
        }
        functions.chest.length = 0;

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err);
        });

        message.channel.send(`${message.author.username} opened the chest!`)
    }
}