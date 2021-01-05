const functions = require('../functions.js');

module.exports = {
    name: 'server',
    description: 'Gets the status of the server',
    async execute(message, args) {
        const serverStatus = await functions.requestAPI();

        if (serverStatus.headers.connection) {
            message.channel.send(`The server connection is ${serverStatus.headers.connection}`);
        }
    },
};