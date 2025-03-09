// Stats Data
const stats = {
  strength: 10,
  intelligence: 10,
  endurance: 10,
  mobility: 10,
};

// Update Progress Bars
function updateProgressBars() {
  for (const stat in stats) {
    const bar = document.getElementById(`${stat}-bar`);
    const value = document.getElementById(`${stat}-value`);
    if (bar && value) {
      bar.style.width = `${stats[stat]}%`;
      value.textContent = stats[stat];
    }
  }
}

// Quests
const quests = document.querySelectorAll('#quest-list input');
quests.forEach(quest => {
  quest.addEventListener('change', () => {
    if (quest.checked) {
      stats.strength += 5; // Example: Increase strength on quest completion
      updateProgressBars();
    }
  });
});

// Achievements
const achievements = document.querySelectorAll('#achievement-list li');
achievements.forEach(achievement => {
  if (achievement.getAttribute('data-unlocked') === 'false') {
    achievement.addEventListener('click', () => {
      achievement.setAttribute('data-unlocked', 'true');
      stats.intelligence += 10; // Example: Increase intelligence on achievement unlock
      updateProgressBars();
    });
  }
});

// Initial Load
updateProgressBars();
