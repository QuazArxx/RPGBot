const fs = require('fs');
const players = require('../players.json');

module.exports = {
    name: 'clear',
    description: 'Clears the inv',
    execute(message, args) {
        players[0].inv.length = 0;

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err);
        });

        message.channel.send('Inv cleared.');
    }
}