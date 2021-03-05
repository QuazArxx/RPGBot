const Discord = require('discord.js');
const fs = require('fs');

const { prefix } = require('../../config.json');
const functions = require('../../functions.js');
const messages = require('../../messages.js');
const colors = require('../../colors.json');
const players = require('../../players.json');

module.exports = {
    name: 'clear',
    description: 'Clears the chest, party, or enemy',
    execute(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(messages.noPermission);

        args = message.content.slice(prefix.length).split(' ');
        if (!args[1]) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.error)
            .setTitle('You forgot to say what you wanted to clear!')

            return message.channel.send(embed);
        } 
        
        if (!(args[1] == 'chest' || args[1] == 'party' || args[1] == 'enemy' || args[1] == "inv")) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.error)
            .setTitle('Please choose "chest", "party", "enemy", or "inv" to clear.')

            return message.channel.send(embed);
        }

        if (args[1] == 'chest') {
            functions.chest.length = 0;
            message.delete();
            return message.channel.send('Chest cleared successfully.');
        } else if (args[1] == 'party') {
            functions.party.length = 0;
            message.delete();
            return message.channel.send('Party cleared successfully.');
        } else if (args[1] == 'enemy') {
            functions.enemy.length = 0;
            message.delete();
            return message.channel.send('Enemy cleared successfully.')
        } else if (args[1] == 'inv') {
            if (!message.mentions.users.first()) {
                const embed = new Discord.MessageEmbed()
                .setColor(colors.error)
                .setTitle('Please mention a user whose inventory you want cleared.')

                return message.channel.send(embed);
            } else if (!(players.some(user => user.id == message.mentions.users.first().id))) {
                const embed1 = new Discord.MessageEmbed()
                .setColor(colors.error)
                .setTitle('Mentioned user isn\'t a player yet.')

                return message.channel.send(embed1)
            }

            for (let x = 0; x < players.length; x++) {
                if (players[x].id == message.mentions.users.first().id) {
                    players[x].inv.length = 0;

                    fs.writeFile('./players.json', JSON.stringify(players), err => {
                        if (err) console.error(err);
                    });
                    
                    message.delete();
                    return message.channel.send(`${message.mentions.users.first().username}\'s inventory has been cleared successfully.`);
                }
            }
        }
    }
}