const Discord = require('discord.js');

const players = require('../functions.js');
const { rpgbot } = require('../colors.json');

module.exports = {
    name: 'start',
    description: 'Used by new players to start their quest',
    execute(message, args) {
        if (players.some(id => id.id == message.author.id)) return message.channel.send('You\'ve already begun your adventure!');
        const embed = new Discord.MessageEmbed()
        .setColor(rpgbot)
        .setTitle('Welcome to the start of a new adventure!')

        message.channel.send(embed);

    }
}