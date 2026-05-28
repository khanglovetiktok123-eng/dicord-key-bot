const express = require("express");
const fs = require("fs");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const PORT = 3000;
const DB = "keys.json";

function loadKeys() {
    if (!fs.existsSync(DB)) {
        fs.writeFileSync(DB, "[]");
    }

    return JSON.parse(fs.readFileSync(DB));
}

function saveKeys(data) {
    fs.writeFileSync(DB, JSON.stringify(data, null, 2));
}

function randomKey() {
    return "KEY-" + Math.random()
        .toString(36)
        .substring(2, 10)
        .toUpperCase();
}

// API tạo key
app.post("/api/create-key", (req, res) => {

    const keys = loadKeys();

    const newKey = {
        key: randomKey(),
        used: false,
        createdAt: new Date().toISOString()
    };

    keys.push(newKey);

    saveKeys(keys);

    res.json(newKey);
});

// API check key
app.post("/api/check-key", (req, res) => {

    const { key } = req.body;

    const keys = loadKeys();

    const found = keys.find(k => k.key === key);

    if (!found) {
        return res.json({
            success: false,
            message: "Key không hợp lệ"
        });
    }

    res.json({
        success: true,
        message: "Key hợp lệ",
        data: found
    });
});

// API list key
app.get("/api/keys", (req, res) => {
    res.json(loadKeys());
});

// API delete key
app.delete("/api/delete-key/:key", (req, res) => {

    let keys = loadKeys();

    keys = keys.filter(k => k.key !== req.params.key);

    saveKeys(keys);

    res.json({
        success: true
    });
});

app.listen(PORT, () => {
    console.log("Web/API running at http://localhost:" + PORT);
});
