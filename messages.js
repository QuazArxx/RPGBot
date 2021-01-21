const Discord = require('discord.js');

const colors = require('./colors.json');
const { enemy } = require('./functions.js');

module.exports = {
    startAdventure: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('You haven\'t started the adventure yet! Please type "r!start" to be able to battle.')
    
    ,
    
    chestSpawn: new Discord.MessageEmbed()
    .setColor(colors.rpgbot)
    .setTitle('A chest spawned! Type "r!unlock" to open it first! (Must have a key first)')
    
    ,
    
    enemyDef: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('The enemy\'s defense is too high! Your attacks don\'t do any damage!')

    ,

    notInParty: new Discord.MessageEmbed()
    .setColor(colors.error)
    .setTitle('You\'re not part of the battle')
}