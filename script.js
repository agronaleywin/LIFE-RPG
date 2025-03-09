// EPIC RPG ENGINE
class DraculaRPG {
  constructor() {
    this.level = 1;
    this.stats = {
      bloodMagic: 0,
      strength: 10,
      cursedKnowledge: 0
    };
    this.bossHealth = 100;
    this.init();
  }

  init() {
    // Start music
    document.getElementById('bg-music').play();

    // Initialize particles
    this.createParticles();

    // Load saved progress
    this.loadProgress();
  }

  // Blood Mist Particles
  createParticles() {
    const particleCount = 100;
    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement('div');
      particle.className = 'blood-particle';
      particle.style.left = `${Math.random() * 100}%`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      document.getElementById('particles').appendChild(particle);
    }
  }

  // Level Up System
  levelUp() {
    this.level++;
    document.getElementById('level').textContent = `Level ${this.level}`;
    this.animateLevelUp();
    
    if (this.level % 10 === 0) {
      this.startBossBattle();
    }
  }

  // Boss Battle!
  startBossBattle() {
    document.getElementById('boss-modal').classList.remove('hidden');
    this.bossHealth = 100;
    this.animateBossEntrance();
  }

  attackBoss() {
    this.bossHealth -= 10;
    document.querySelector('.boss-health .health-bar').style.width = `${this.bossHealth}%`;
    
    if (this.bossHealth <= 0) {
      this.defeatBoss();
    }
  }

  // Save Progress (LocalStorage)
  saveProgress() {
    localStorage.setItem('draculaRPG', JSON.stringify({
      level: this.level,
      stats: this.stats
    }));
  }

  loadProgress() {
    const saved = JSON.parse(localStorage.getItem('draculaRPG'));
    if (saved) {
      this.level = saved.level;
      this.stats = saved.stats;
      this.updateUI();
    }
  }

  // Update All UI Elements
  updateUI() {
    document.querySelector('.moon-progress').style.width = `${this.level}%`;
    document.getElementById('level').textContent = `Level ${this.level}`;
  }
}

// Initialize the RPG
const game = new DraculaRPG();

// Unlock Skills
function unlockSkill(skill) {
  if (game.stats[skill] < 100) {
    game.stats[skill] += 10;
    game.levelUp();
    game.saveProgress();
  }
}

// Start Quest
function startQuest(quest) {
  // Add quest logic here
}
