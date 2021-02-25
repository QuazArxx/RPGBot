const functions = require('../functions.js');

module.exports = {
    name: 'show',
    description: 'Shows the chest contents',
    execute(message, args) {
        message.channel.send(require('util').inspect(functions.chest));
    }
}