const { MessageFlags } = require('discord.js');
const fs = require('fs');

const { prefix } = require('../../config.json');
const functions = require('../../functions.js');

module.exports = {
    name: 'clear',
    description: 'Clears the chest, party, or enemy',
    execute(message, args) {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send('You don\'t have permission to do that!')

        args = message.content.slice(prefix.length).split(' ');

        if (!args[1]) return message.channel.send('You forgot to say what you wanted to clear!');
        if (!(args[1] == 'chest' || args[1] == 'party' || args[1] == 'enemy')) return message.channel.send('Please choose "chest", "party", or "enemy" to clear.');

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