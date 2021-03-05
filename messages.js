const Discord = require('discord.js');

const colors = require('./colors.json');

module.exports = {
    startAdventure: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('You haven\'t started the adventure yet! Please type "r!start" to begin!')
    
    ,
    
    chestSpawn: new Discord.MessageEmbed()
    .setColor(colors.chest)
    .setTitle('A chest spawned! Type "r!open" to open it!')

    ,

    chestDisappeared: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('The chest disappeared!')
    
    ,
    
    enemyDef: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('The enemy\'s defense is too high! Your attacks don\'t do any damage!')

    ,

    notInParty: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('You\'re not part of the battle')

    ,

    noPermission: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('You don\'t have permission to do that!')
}