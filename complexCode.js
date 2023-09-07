/*
    Filename: complexCode.js
    
    This code is a complex JavaScript program that demonstrates various advanced concepts and techniques.
    It includes multiple functions, advanced data structures, loops, conditionals, and error handling.
    The program also interacts with the DOM, manipulates HTML elements, and makes HTTP requests using Fetch API.
*/

// Custom Constants
const PI = 3.14159;
const MAX_ATTEMPTS = 5;

// Custom Classes
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

// Utility Functions
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showError(message) {
    console.error(`Error: ${message}`);
}

// Main Program
function main() {
    console.log('Starting complex code...');

    try {
        const rectangles = [];

        for (let i = 0; i < MAX_ATTEMPTS; i++) {
            const width = getRandomNumber(1, 10);
            const height = getRandomNumber(1, 10);
            rectangles.push(new Rectangle(width, height));
        }

        rectangles.forEach((rectangle, index) => {
            const area = rectangle.getArea();
            const perimeter = rectangle.getPerimeter();

            console.log(`Rectangle ${index + 1}: Width=${rectangle.width}, Height=${rectangle.height}`);
            console.log(`- Area: ${area}`);
            console.log(`- Perimeter: ${perimeter}`);

            if (area > perimeter) {
                console.log('Area is greater than perimeter!');
            } else {
                console.log('Perimeter is greater than or equal to area!');
            }
        });

        // Fetch API Example
        fetch('https://api.example.com/data')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data:');
                console.log(data);
            })
            .catch(error => {
                showError(`Failed to fetch data: ${error}`);
            });

        console.log('Complex code finished!');
    } catch (error) {
        showError('An unexpected error occurred.');
    }
}

main();