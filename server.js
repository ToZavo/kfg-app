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

const affirmations = [
    "Look where your feet are. In spite of your best efforts you've made it this far. Keep Fucking Going!",
    "You're not defective, you're a human with weird wiring, and unfinished shit to-do.",
    "Breathe, dipshit. You don't have to solve life. It'll figure itself out.",
    "Progress counts even when it looks rough and forced.",
    "Are you having a shit day, or just a rough 5 minutes you're stretching out?",
    "There's no scoreboard, you're not behind. You're in position, growing, and still in the game.",
    "Name 5 things right now you see. That's the assignment."
];

app.get("/api/affirmation", (req, res) => {
    const randomIndex = Math.floor(Math.random() * affirmations.length);
    res.json({ affirmation: affirmations[randomIndex] });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});