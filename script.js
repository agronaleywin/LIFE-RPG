let level = 1;
let xp = 0;
let xpNeeded = 1000;
let gold = 0;

function gainXP(amount) {
    xp += amount;
    if (xp >= xpNeeded) {
        levelUp();
    }
    updateStats();
}

function levelUp() {
    level++;
    xp = 0;
    xpNeeded *= 1.5; // Next level requires 50% more XP
    gold += 500; // Reward for leveling up
    alert("🎉 Level Up! You are now Level " + level + "!");
}

function updateStats() {
    document.getElementById("level").innerText = level;
    document.getElementById("xp").innerText = xp;
    document.getElementById("xpNeeded").innerText = xpNeeded;
    document.getElementById("gold").innerText = gold;
}
