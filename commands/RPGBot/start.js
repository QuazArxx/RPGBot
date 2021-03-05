const fs = require('fs');

const players = require('../../players.json');

module.exports = {
    name: 'start',
    description: 'Used by new players to start their quest',
    execute(message, args) {
        if (players.some(user => user.id === message.author.id)) return message.channel.send('You\'ve already joined the adventure!')
        players.push({
            name: message.author.username,
            id: message.author.id,
            hp: 100,
            atk: 5,
            def: 1,
            level: 1,
            exp: 0,
            inv: []
        });

        fs.writeFile('./players.json', JSON.stringify(players), err => {
            if (err) console.error(err);
        });

        message.channel.send(`${message.author.username} joined the RPG adventure!`);
    }
}