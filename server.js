const affirmations = require("./affirmations");
const express = require("express");
const app = express();

const path = require("path");

app.use(express.static(path.join(__dirname, "../public")));

app.get('/api/jft', (req, res) => {
    res.json({
        title: "Just For Today",
        reading: `Test reading works.`
    });
});

app.get("/api/spad", (req, res) => {
    res.json({
        title:"Spiritual Principle a Day",
        reading: `Test reading works- SPaD.`
    });
});



app.get("/api/affirmation", (req, res) => {
    const today = new Date();

    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const affirmationIndex = dayOfYear % affirmations.length;

    res.json({
        affirmation: affirmations[affirmationIndex],
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});