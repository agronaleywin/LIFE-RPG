// Dracula's RPG Engine
class TranscendenceRPG {
  constructor() {
    this.classes = {
      healer: { xp: 0, level: 1 },
      titan: { xp: 0, level: 1 }
    };
    this.bossHealth = 100;
    this.loadProgress();
  }

  // Auto-Save to localStorage
  saveProgress() {
    localStorage.setItem('draculaRPG', JSON.stringify(this.classes));
  }

  loadProgress() {
    const saved = JSON.parse(localStorage.getItem('draculaRPG'));
    if (saved) this.classes = saved;
  }

  // Level Up Logic
  updateClass(classType) {
    const xp = this.classes[classType].xp;
    const newLevel = Math.floor(xp / 1000);
    
    if (newLevel > this.classes[classType].level) {
      this.classes[classType].level = newLevel;
      document.getElementById('level').textContent = newLevel;
      document.getElementById('blood-fill').style.width = `${(xp % 1000)/10}%`;
      
      if (newLevel % 10 === 0) this.spawnBoss();
    }
  }

  // Boss Battle System
  spawnBoss() {
    document.getElementById('boss-modal').classList.remove('hidden');
    this.bossHealth = 100;
  }

  attackBoss() {
    this.bossHealth -= 10;
    document.getElementById('boss-health').style.width = `${this.bossHealth}%`;
    if (this.bossHealth <= 0) this.defeatBoss();
  }

  defeatBoss() {
    this.classes.healer.xp += 2000;
    this.updateClass('healer');
  }
}

// Initialize the Game
const game = new TranscendenceRPG();

// Quest Completion
document.querySelectorAll('#quest-list input').forEach(quest => {
  quest.addEventListener('change', () => {
    if (quest.checked) {
      const xp = parseInt(quest.parentElement.dataset.xp);
      const classType = quest.parentElement.dataset.class;
      game.classes[classType].xp += xp;
      game.updateClass(classType);
      game.saveProgress();
    }
  });
});
