const Discord = require('discord.js');

const players = require('../../players.json');
const colors = require('../../colors.json');
const messages = require('../../messages.js');

module.exports = {
    name: 'inv',
    description: 'Displays users inventory',
    aliases: 'i',
    execute(message, args) {
        if (!(players.some(user => user.id === message.author.id))) return message.channel.send(messages.startAdventure);
    
        var userInv;
        for (let x = 0; x < players.length; x++) {
            if (players[x].id == message.author.id) {
                userInv = players[x];
            }
        }

        if (userInv.inv.length == 0) {
            const embed = new Discord.MessageEmbed()
            .setColor(colors.error)
            .setTitle(`${message.author.username}'s inventory is empty!`)

            return message.channel.send(embed);
        }

        let invMessage = '';
        for (let x = 0; x < userInv.inv.length; x++) {
            invMessage += `${userInv.inv[x].item} X${userInv.inv[x].amount}\n`
        }

        const embed = new Discord.MessageEmbed()
        .setColor(colors.rpgbot)
        .setTitle(`__${message.author.username}'s Inventory:__`)
        .addField('\u200B', invMessage)

        message.channel.send(embed);
    }
}