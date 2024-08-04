const dataKeyName = "DATA";
const streakKeyName = "STREAK";
const dayZeroText = "You better not eat shit 😠";
const dayOneText = "Nice start 💪";
const dayXText = "days of clean eating 🔥"

if ("serviceWorker" in navigator) {
    // register service worker
    navigator.serviceWorker.register("service-worker.js");
  }

// extract diet history from local storage
const registeredData = localStorage.getItem(dataKeyName) || "{}";
let dietHistory = {};
try {
    dietHistory = JSON.parse(registeredData);
} catch {}

// extract if today was a clean diet
const todaysDateKey = (new Date()).toLocaleDateString();
const wasDietCleanToday = dietHistory[todaysDateKey];

// extract if yesterday was a clean diet
const yesterdaysDate = new Date();
yesterdaysDate.setDate(yesterdaysDate.getDate() - 1);
const yesterdaysDateKey = yesterdaysDate.toLocaleDateString();
const wasDietCleanYesterday = dietHistory[yesterdaysDateKey];


const streakInMemory = localStorage.getItem(streakKeyName) || 0;
const streakContributionToday = (wasDietCleanToday ? 1: 0);
const streak = wasDietCleanYesterday? parseInt(streakInMemory): streakContributionToday;
localStorage.setItem(streakKeyName, streak);

document.getElementById("submit-progress").textContent = wasDietCleanToday? "Oops I ate crap :(" : "I was clean today :)";
document.getElementById("submit-progress").style.backgroundColor = wasDietCleanToday? "#C52F21" : "#0172AD";
document.getElementById("streak-text").textContent = streak == 0? dayZeroText : (streak == 1? dayOneText: `${streak} ${dayXText}`);

document.getElementById('submit-progress').addEventListener('click', () => {
    dietHistory[todaysDateKey] = !wasDietCleanToday;
    localStorage.setItem(dataKeyName, JSON.stringify(dietHistory));
    if(wasDietCleanToday) localStorage.setItem(streakKeyName, streak-1);
    if(!wasDietCleanToday) localStorage.setItem(streakKeyName, streak+1);
    location.reload();
});