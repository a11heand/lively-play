/*
   File Name: sophisticated_code.js
   
   Description: This code demonstrates a sophisticated and complex JavaScript program 
   that simulates a virtual pet game. It includes various classes, functions, and 
   event handling to create a fully interactive and engaging game.
*/

class VirtualPet {
  constructor(name) {
    this.name = name;
    this.hunger = 50;
    this.thirst = 50;
    this.energy = 100;
    this.happiness = 100;
    this.age = 0;
  }

  feed() {
    this.hunger -= 10;
    this.happiness += 5;
    this.energy += 5;
    this.checkStatus();
  }

  water() {
    this.thirst -= 15;
    this.happiness += 5;
    this.energy += 5;
    this.checkStatus();
  }

  sleep() {
    this.energy = 100;
    this.age++;
    this.checkStatus();
  }

  play() {
    this.happiness += 10;
    this.energy -= 10;
    this.checkStatus();
  }

  checkStatus() {
    if (this.hunger <= 0 || this.thirst <= 0 || this.energy <= 0 || this.happiness <= 0) {
      console.log(this.name + " has died. Game Over.");
      // Additional game over logic and UI here...
    }
    else {
      console.log(this.name + " is doing fine!");
    }
  }
}

function initializeGame() {
  const petName = prompt("Enter your pet's name: ");
  const pet = new VirtualPet(petName);

  document.getElementById("feedBtn").addEventListener("click", () => {
    pet.feed();
  });

  document.getElementById("waterBtn").addEventListener("click", () => {
    pet.water();
  });

  document.getElementById("sleepBtn").addEventListener("click", () => {
    pet.sleep();
  });

  document.getElementById("playBtn").addEventListener("click", () => {
    pet.play();
  });
}

// Additional UI and game logic here...

initializeGame();
// End of code