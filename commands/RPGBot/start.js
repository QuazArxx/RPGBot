const axios = require('axios')

module.exports = {
    name: 'start',
    description: 'Used by new players to start their quest',
    async execute(message, args) {
        
        try {
            await axios.post('http://dev.freydo-apis.tech/rpgbot/user/add', {
                uName: message.author.id,
                pass: message.author.id
            })
        } catch (err) {
            console.error(err)
        }

        message.channel.send(`${message.author.username} joined the RPG adventure!`);
    }
}