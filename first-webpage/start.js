//Just to ensure we force js into strict mode - we don't want any sloppy code
'use strict';

let x = 3, y = 5;
console.log(`\nAdding two variables: ${x}+${y} = ${x+y}`);

let numbers = [10,20,20,40,50];
let sum = 0;
console.log(`\nLooping over an array [${numbers}]`);
for (let i of numbers)
{
    console.log(i);
    sum += i;
}
console.log(`Length of array is: ${numbers.length}`);
console.log(`Sum of all elements is: ${sum}`);
//debugger;

sum = 0;
numbers.map(n => sum += n*n);
console.log(`\nSquare sum of all elements using map and arrow function: ${sum}`);
