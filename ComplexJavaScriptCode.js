/*
   FileName: ComplexJavaScriptCode.js

   This code demonstrates a sophisticated and complex JavaScript program that uses multiple functions and objects to perform various tasks.

   Author: [Your Name]
   Date: [Date]

   This code is an example of a complex JavaScript program that goes beyond a simple "hello world" example or a simple calculator.

   Please note that the code provided here is for illustrative purposes only and may not serve any practical purpose.

*/

// Constants
const PI = 3.14159;
const MAX_ITERATIONS = 1000;

// Utility Functions
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function isPrime(number) {
  if (number < 2) return false;
  for (let i = 2; i <= Math.sqrt(number); i++) {
    if (number % i === 0) return false;
  }
  return true;
}

function calculateArea(radius) {
  return PI * radius * radius;
}

// Object Definitions
class Rectangle {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }

  getArea() {
    return this.width * this.height;
  }

  getPerimeter() {
    return 2 * (this.width + this.height);
  }
}

// Main Program
function main() {
  console.log("Starting Complex JavaScript Code...");

  // Generate a random number
  const randomNumber = getRandomNumber(1, 100);
  console.log("Random Number:", randomNumber);

  // Check if the random number is prime
  const isRandomNumberPrime = isPrime(randomNumber);
  console.log("Is Random Number Prime?", isRandomNumberPrime);

  // Calculate the area of a circle with the random number as the radius
  const circleArea = calculateArea(randomNumber);
  console.log("Circle Area:", circleArea);

  // Create a rectangle object
  const rectangle = new Rectangle(5, 10);
  console.log("Rectangle Area:", rectangle.getArea());
  console.log("Rectangle Perimeter:", rectangle.getPerimeter());

  console.log("Complex JavaScript Code execution complete.");
}

// Call the main function to start the program
main();
