const axios = require('axios')

module.exports = {
    func: async function () {
        try {
            await axios.get('https://dev.freydo-apis.tech/rpgbot/user/get-all/index.php')
        } catch (err) {
            console.error(err)
        }
    },
    name: 'test',
    async execute(message, args) {
        let player = await this.func()
        
        console.log(player)
    }
}