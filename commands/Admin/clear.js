const Discord = require('discord.js');
const fs = require('fs');

const functions = require('../../functions.js');
const messages = require('../../messages.js');
const colors = require('../../colors.json');

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
        
        if (!(args[1] == 'chest' || args[1] == 'party' || args[1] == 'enemy')) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.error)
            .setTitle('Please choose "chest", "party", or "enemy" to clear.')

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
        }
    }
}