new Vue({
  el: "#app",
  data: {
    playerHealth: 100,
    bacteriaHealth: 100,
    gameIsRunning: false,
    turns: [],
    currentTurn: 0
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.bacteriaHealth = 100;
      this.turns = [];
    },
    attack: function() {
      var damage = this.calculateDamage(3, 10);
      this.bacteriaHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Doctor hits Bacteria for " + damage,
        id: this.currentTurn + 1
      });
      this.currentTurn++;
      if (this.checkWin()) {
        return;
      }

      this.bacteriaAttacks();
    },
    specialAttack: function() {
      var damage = this.calculateDamage(10, 20);
      this.bacteriaHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: "Doctor hits Bacteria hard for " + damage,
        id: this.currentTurn + 1
      });
      this.currentTurn++;
      if (this.checkWin()) {
        return;
      }
      this.bacteriaAttacks();
    },
    heal: function() {
      if (this.playerHealth <= 90) {
        this.playerHealth += 10;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: "Doctor heals for 10",
        id: this.currentTurn + 1
      });
      this.currentTurn++;
      this.bacteriaAttacks();
    },
    giveUp: function() {
      this.gameIsRunning = false;
    },
    bacteriaAttacks: function() {
      var damage = this.calculateDamage(5, 12);
      this.playerHealth -= damage;
      this.checkWin();
      this.turns.unshift({
        isPlayer: false,
        text: "Bacteria hits Doctor for " + damage,
        id: this.currentTurn + 1
      });
      this.currentTurn++;
    },
    calculateDamage: function(min, max) {
      return Math.max(Math.floor(Math.random() * max) + 1, min);
    },
    checkWin: function() {
      if (this.bacteriaHealth <= 0) {
        if (confirm("You won! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      } else if (this.playerHealth <= 0) {
        if (confirm("You lost! New Game?")) {
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }
  }
});
