if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("/sw.js");
}

//=================================
// DOM ELEMENTS
//=================================
const cleanDateInput = document.getElementById("cleanDate");
const cleanTimeDisplay = document.getElementById("cleanTimeDisplay");
const saveDateBtn = document.getElementById("saveDateBtn");
const homeScreen = document.getElementById("homeScreen");
const readingScreen = document.getElementById("readingScreen");
const backBtn = document.getElementById("backBtn");
const saveStatus = document.getElementById("saveStatus");
const readingDisplay = document.getElementById("readingDisplay");
const journalEntry = document.getElementById("journalEntry");
const saveEntryBtn = document.getElementById("saveEntryBtn");

//=================================
// DATE FORMATTING  
//=================================
const today = new Date();

const formattedDate = today.toLocaleDateString("en-US", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric"
});


//=================================
// CLEAN TIME
//=================================
console.log("INDEX.J2 LOADED");
let displayMode = 0;

cleanTimeDisplay.addEventListener("click", () => {
    displayMode++;

    if (displayMode > 2) {
        displayMode =0;
    }

    updateCleanTime();
});

saveDateBtn.addEventListener("click", () => {
    localStorage.setItem("cleanDate", cleanDateInput.value);
    updateCleanTime();
});

// Show clean time on page load
updateCleanTime();

function updateCleanTime() {
    const cleanDate = localStorage.getItem("cleanDate");
    
    if (!cleanDate) {
        return;
    }

const startDate = new Date(cleanDate);
const today = new Date();

startDate.setHours(0, 0, 0, 0);
today.setHours(0, 0, 0, 0);

const difference = today.getTime() - startDate.getTime();
const daysClean = Math.floor(difference / (1000 * 60 * 60 * 24));

let years = today.getFullYear() - startDate.getFullYear();
let months = today.getMonth() - startDate.getMonth();
let days = today.getDate() - startDate.getDate();

if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
}

if (months < 0) {
    years--;
    months += 12;
}

const totalMonths = years * 12 + months;

if (displayMode === 0) {
    cleanTimeDisplay.textContent = `${daysClean} days clean`;
}

if (displayMode === 1) {
    cleanTimeDisplay.textContent = `${years} years, ${months} months, ${days} days clean`;
}

if (displayMode === 2) {
    cleanTimeDisplay.textContent = `${totalMonths} months, ${days} days clean`;
}


}


//=================================
// JFT / SPaD READINGS
//=================================
const jftBtn = document.getElementById("jftBtn");
const spadBtn = document.getElementById("spadBtn");

console.log("jftBtn", jftBtn);
console.log("spadBtn", spadBtn);
console.log("readingDisplay", readingDisplay);
jftBtn.addEventListener("click", () => {
    readingDisplay.innerHTML = `
        <h3>${dailyReadings.jft.title}</h3>
        <p>${formattedDate}</p>
        <p>${dailyReadings.jft.reading}</p>
    `;

});

spadBtn.addEventListener("click", () => {
    readingDisplay.innerHTML = `
        <h3>${dailyReadings.spad.title}</h3>
        <p>${formattedDate}</p>
        <p>${dailyReadings.spad.reading}</p>
    `;

});

saveEntryBtn.addEventListener("click", async () => {
    const cleanDate = localStorage.getItem("cleanDate");
    const cleanDays = cleanDate 
    ? Math.floor((new Date().getTime() - new Date(cleanDate).getTime()) / (1000 * 60 * 60 * 24)) : 0;

    await fetch("/entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            date: formattedDate,
            content: journalEntry.value,
            clean_days: cleanDays
        }),
    });

    saveStatus.textContent = "I got you, Big Dog";
});



//=================================
// SCREEN HELPERS
//=================================
function showScreen(screen) {
    homeScreen.classList.remove("active");
    readingDisplay.classList.remove("active");

}


//=================================
// AFFIRMATIONS
//=================================
const affirmationText = document.querySelector("#affirmationText");
async function loadAffirmation() {
    const response = await fetch("/api/affirmation");
    const data = await response.json();

    affirmationText.textContent = data.affirmation;
}

loadAffirmation();

//=================================
// LOAD LATEST JOURNAL ENTRY
//=================================

async function loadLatestEntry() {
    const response = await fetch("/entries");
    const entries = await response.json();

    if (entries.length > 0) {
        journalEntry.value = entries[entries.length - 1].content;
    }
}

loadLatestEntry();