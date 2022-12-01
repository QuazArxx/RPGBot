const { EmbedBuilder } = require('discord.js');

const colors = require('./colors.json');

module.exports = {
    startAdventure: new EmbedBuilder()
    .setColor(colors.error)
    .setTitle('You haven\'t started the adventure yet! Please type "r!start" to begin!')
    
    ,
    
    chestSpawn: new EmbedBuilder()
    .setColor(colors.chest)
    .setTitle('A chest spawned! Type "r!open" to open it!')

    ,

    chestDisappeared: new EmbedBuilder()
    .setColor(colors.error)
    .setTitle('The chest disappeared!')
    
    ,
    
    enemyDef: new EmbedBuilder()
    .setColor(colors.error)
    .setTitle('The enemy\'s defense is too high! Your attacks don\'t do any damage!')

    ,

    notInParty: new EmbedBuilder()
    .setColor(colors.error)
    .setTitle('You\'re not part of the battle')

    ,

    noPermission: new EmbedBuilder()
    .setColor(colors.error)
    .setTitle('You don\'t have permission to do that!')
}