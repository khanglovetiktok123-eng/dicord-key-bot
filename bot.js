const {
    Client,
    GatewayIntentBits,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN = process.env.TOKEN;

client.once("ready", () => {
    console.log(`${client.user.tag} online`);
});

client.on("interactionCreate", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    // /menu
    if (interaction.commandName === "menu") {

        const row = new ActionRowBuilder().addComponents(
            new ButtonBuilder()
                .setLabel("MỞ MENU")
                .setStyle(ButtonStyle.Link)
                .setURL("https://raw.githack.com/khanglovetiktok123-eng/dicord-key-bot/main/menu.html")
        );

        return interaction.reply({
            content: "🚀 MENU H5GG",
            components: [row]
        });
    }

});

client.login(TOKEN);
