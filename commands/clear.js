const { party, enemy } = require('../functions.js');

module.exports = {
    name: 'clear',
    description: 'Clears the party',
    execute(message, args) {
        party.length = 0;
        enemy.length = 0;
        message.channel.send('Party and enemy cleared.')
    }
}