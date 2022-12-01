const { Client, Collection, IntentsBitField, EmbedBuilder } = require('discord.js')
const { token } = require('./config.json')

const fs = require('node:fs')
const path = require('node:path')

const functions = require('./functions.js')

let used = false

// Sets Discord IntentsBitField
const discordIntents = new IntentsBitField()
discordIntents.add(
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildPresences,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.GuildMessageReactions,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildIntegrations,
    IntentsBitField.Flags.MessageContent
)

// Declares the client and the commands for the handler
const client = new Client({intents: discordIntents, partials: ["MESSAGE", "CHANNEL", "REACTION"]})
client.commands = new Collection()

const commandsPath = path.join(__dirname, 'commands')
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file)
	const command = require(filePath)
	// Set a new item in the Collection
	// With the key as the command name and the value as the exported module
	client.commands.set(command.data.name, command)
}

// When client turns on it logs that it's on
client.once('ready', async () => {
	console.log(`${client.user.username} is online!`)
})

// This is the start of the main function when the bot is turned on
client.on('interactionCreate', async interaction => {
    if (!interaction.isChatInputCommand) return

    const command = interaction.client.commands.get(interaction.commandName)
    
    if (!command) return;

    try {
	    await command.execute(interaction, client);
    }  
    catch (error) {
	    console.error(error);
	    await interaction.reply({ content: 'Something went wrong! Don\'t worry though, Quaz has been notified.', ephemeral: true })

        const embed = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Command Error')
        .addFields(
            {name: `${interaction.user.username} tried to use "${interaction}" but it failed.`, value: `${error}`}
        )
        await client.users.send('387959359394807808', { embeds: [embed] })
    }
})

// This logs in the bot with the specified token found in config
client.login(token)