const axios = require('axios');

const getMonsters = async () => {
    try {
        return await axios.get('http://dev.freydo-apis.tech/rpgbot/monster/get-all')
    }catch (error) {
        console.error(error)
    }
}

module.exports = {
    name: 'test',
    async execute(message, args) {
        // dev.freydo-apis.tech/rpgbot/monster/get-all
        const Message = async () => {
            const monsters = await getMonsters()

            //console.log(monsters)
            message.channel.send(require('util').inspect(monsters.data));
            //message.channel.send(monsters.data);
        }
        
        Message()
    }
}