const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
    intents: [GatewayIntentBits.Guilds]
});

const TOKEN ="MTUwOTQ2NDg4NzYyNDA3NzQyMg.GibZ-k.lLV8zfAPG9qzv6CEvVL0wZBlXQ0twDd21Q1r-s";

// API URL
const API = "https://dicord-key-bot.onrender.com";

client.once("ready", () => {
    console.log(`${client.user.tag} online`);
});

client.on("interactionCreate", async interaction => {

    const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

    const row = new ActionRowBuilder().addComponents(
        new ButtonBuilder()
            .setLabel("MỞ MENU")
            .setStyle(ButtonStyle.Link)
            .setURL("https://raw.githack.com/khanglovetiktok123-eng/dicord-key-bot/main/menu.html")
    );

    interaction.reply({
        content: "Menu của bạn đây",
        components: [row]
    });
}", async interaction => {

    if (!interaction.isChatInputCommand()) return;

    // createkey
    if (interaction.commandName === "createkey") {

        const req = await fetch(API + "/api/create-key", {
            method: "POST"
        });

        const data = await req.json();

        interaction.reply(
            `✅ Key mới: \`${data.key}\``
        );
    }

    // checkkey
    if (interaction.commandName === "checkkey") {

        const key = interaction.options.getString("key");

        const req = await fetch(API + "/api/check-key", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ key })
        });

        const data = await req.json();

        interaction.reply(data.message);
    }

    // listkeys
    if (interaction.commandName === "listkeys") {

        const req = await fetch(API + "/api/keys");

        const keys = await req.json();

        if (keys.length === 0) {
            return interaction.reply("Không có key");
        }

        let text = keys.map(k =>
            `🔑 ${k.key} | Used: ${k.used}`
        ).join("\n");

        interaction.reply(text);
    }

});

client.login(TOKEN);
