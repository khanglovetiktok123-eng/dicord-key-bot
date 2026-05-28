const {
    REST,
    Routes,
    SlashCommandBuilder
} = require("discord.js");

const TOKEN = "PUT_BOT_TOKEN";
const CLIENT_ID = "1509464887624077422";

const commands = [

    new SlashCommandBuilder()
        .setName("createkey")
        .setDescription("Tạo key"),

    new SlashCommandBuilder()
        .setName("checkkey")
        .setDescription("Check key")
        .addStringOption(option =>
            option.setName("key")
            .setDescription("Nhập key")
            .setRequired(true)
        ),

    new SlashCommandBuilder()
        .setName("listkeys")
        .setDescription("Danh sách key")

].map(c => c.toJSON());

const rest = new REST({ version: "10" })
    .setToken(TOKEN);

(async () => {

    await rest.put(
        Routes.applicationCommands(CLIENT_ID),
        { body: commands }
    );

    console.log("Slash commands ready");

})();
