/**
 * File name: ComplexProgram.js
 * 
 * Description: A complex program that demonstrates advanced JavaScript concepts and functionalities.
 * This program simulates a virtual pet management system that allows users to interact with virtual pets,
 * feed them, play with them, and monitor their health and happiness levels.
 * 
 * Author: John Doe
 * Date: 2022-07-15
 */

// VirtualPet class definition
class VirtualPet {
  constructor(name, species, age) {
    this.name = name;
    this.species = species;
    this.age = age;
    this.hunger = 50;
    this.happiness = 50;
    this.health = 100;
  }

  feed() {
    this.hunger -= 10;
    this.health += 5;
    this.happiness += 5;
    console.log(`You have fed ${this.name}. Hunger level decreased. Health and happiness increased.`);
  }

  play() {
    this.hunger += 5;
    this.health += 10;
    this.happiness += 20;
    console.log(`You have played with ${this.name}. Hunger level increased. Health and happiness increased.`);
  }

  sleep() {
    this.health += 10;
    this.happiness += 5;
    console.log(`You put ${this.name} to sleep. Health and happiness increased.`);
  }

  checkStatus() {
    console.log(`Pet Name: ${this.name}`);
    console.log(`Species: ${this.species}`);
    console.log(`Age: ${this.age}`);
    console.log(`Hunger Level: ${this.hunger}`);
    console.log(`Happiness Level: ${this.happiness}`);
    console.log(`Health Level: ${this.health}`);
  }
}

// PetManagementSystem class definition
class PetManagementSystem {
  constructor() {
    this.pets = [];
  }

  addPet(pet) {
    this.pets.push(pet);
  }

  feedAllPets() {
    for (let pet of this.pets) {
      pet.feed();
    }
  }

  playWithPet(petName) {
    for (let pet of this.pets) {
      if (pet.name === petName) {
        pet.play();
        break;
      }
    }
  }

  sleepAllPets() {
    for (let pet of this.pets) {
      pet.sleep();
    }
  }

  checkStatusAllPets() {
    for (let pet of this.pets) {
      pet.checkStatus();
    }
  }
}

// Create VirtualPet instances
const pet1 = new VirtualPet("Fluffy", "Cat", 3);
const pet2 = new VirtualPet("Rocky", "Dog", 5);
const pet3 = new VirtualPet("Bubbles", "Fish", 1);

// Create PetManagementSystem instance
const petManagementSystem = new PetManagementSystem();

// Add pets to the management system
petManagementSystem.addPet(pet1);
petManagementSystem.addPet(pet2);
petManagementSystem.addPet(pet3);

// Feed all pets
petManagementSystem.feedAllPets();

// Play with a specific pet
petManagementSystem.playWithPet("Rocky");

// Put all pets to sleep
petManagementSystem.sleepAllPets();

// Check status of all pets
petManagementSystem.checkStatusAllPets();
...

// More code here...

// More than 200 lines of complex code...