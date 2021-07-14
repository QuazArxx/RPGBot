const fs = require('fs');

const { party, enemy } = require('../../functions.js');
const players = require('../../players.json');
const messages = require('../../messages.js');

module.exports = {
    name: 'attack',
    description: 'Attacks the enemy that spawned.',
    aliases: 'a',
    execute(message, args) {
        // Check if user has started the adventure
        if (!(players.some(user => user.id === message.author.id))) return message.channel.send(messages.startAdventure);

        // Check if user is in the attacking party
        if (!(party.some(user => user.id === message.author.id))) return message.channel.send(messages.notInParty);

        let userAttack = 0;
        // Get users attack stat
        for (let x = 0; x < players.length; x++) {
            if (players[x].id == message.author.id) {
                userAttack = players[x].atk;
            }
        }

        // Compare attack stat to defense stat of enemy
        if (enemy[0].def > userAttack) return message.channel.send(messages.enemyDef);

        // TODO add stat altering critChance
        // Check for critical hit
        let critHit = false;
        let critChance = Math.floor(Math.random() * 100);

        if(critChance > 95) critHit = true;

        // TODO make damage a range
        // Calculate damage and apply to enemy HP
        let damage = 0
        if (critHit) {
            damage = userAttack / enemy[0].def * 1.5;
        } else {
            damage = userAttack / enemy[0].def;
        }

        enemy[0].hp -= damage;

        message.channel.send(`${message.author.username} dealt ${damage} damage to the ${enemy[0].name}!`);


        // Adds exp to every player in the party if the monster is defeated
        if (enemy[0].hp <= 0) {
            message.channel.send(`${enemy[0].name} defeated! You gained ${enemy[0].xp} experience!`);
            for (x = 0; x < party.length; x++) {
                for (y = 0; y < players.length; y++) {
                    if (party[x].id == players[y].id) {
                        players[y].exp += enemy[0].xp;
                    }
                }
            }
            enemy.length = 0;
            party.length = 0;
        } else {
            message.channel.send(`${enemy[0].name} has ${enemy[0].hp}HP left. `)
        }

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err);
        });
    },
};