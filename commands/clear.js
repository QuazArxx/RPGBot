const party = require('../functions.js');

module.exports = {
    name: 'clear',
    description: 'Clears the party',
    execute(message, args) {
        party.party.length = 0;
        message.channel.send('Party cleared.')
    }
}