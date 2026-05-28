const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/menu.html");
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Web running");
});
