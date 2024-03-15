//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

// To use ES6 modules, export and import, you need to create a package.json and set the type ot module.
// - open a terminal in your script directory and type: npm init -y
// - open the package file and add the line at the top: "type":"module", 

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Working_With_Private_Class_Features
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce

//studentScore is being exported below after declaration
class studentScore {

    //class contructor
    constructor({ firstName, lastName, email, birthDate } = { firstName: '', lastName: '', email: undefined, birthDate: undefined },
        { minScore, maxScore, avgScore, lastScore } = { minScore: 0, maxScore: 0, avgScore: 0, lastScore: 0 }) {

        this.studentId = studentScore.#uniqueId();
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.birthDate = birthDate;

        this.scores = {};
        this.scores.min = minScore;
        this.scores.max = maxScore;
        this.scores.avg = avgScore;
        this.scores.last = lastScore;
    }

    static #_createRandom() {
        const _firstnames = "Fred, John, Mary, Jane, Oliver, Marie, Per, Thomas, Ann, Susanne".split(',').map(s => s.trim());
        const _lastnames = "Johnsson, Pearsson, Smith, Ewans, Andersson, Svensson, Shultz, Perez".split(',').map(s => s.trim());
        const _emaildomains = "gmail.com, hotmail.com, icloud.com, tele2.se, telia.se".split(',').map(s => s.trim());

        let p = new studentScore();
        p.studentId = this.#uniqueId();
        p.firstName = _firstnames[this.#rnd(0, _firstnames.length)];
        p.lastName = _lastnames[this.#rnd(0, _lastnames.length)];
        p.email =`${p.firstName}.${p.lastName}@${_emaildomains[this.#rnd(0, _emaildomains.length)]}`.toLowerCase();

        p.scores.min = this.#rnd(0, 51);
        p.scores.max = this.#rnd(50, 101);
        p.scores.avg = this.#rnd(p.scores.min, p.scores.max+1);
        p.scores.last = this.#rnd(0, 101);

        while (typeof (p.birthDate) === 'undefined') {
            try {
                //randomNumber = Math.floor(Math.random() * (max - min + 1) ) + min;
                let year = this.#rnd(1970, 2003);
                let month = this.#rnd(1, 13);
                let day = this.#rnd(1, 32);
                p.birthDate = new Date(year, month, day).toDateString();
            }
            catch { }
        }
        return p;
    }

    //private static helper function, needs to be put at the top
    //randomNumber = Math.floor(Math.random() * (max - min) ) + min;
    //non inclusive max, but inclusive min
    static #rnd(min, max) { 
        return Math.floor(Math.random() * (max - min)) + min; }

    //private static helper to generat a uniqueID, not a perfect solution but simple and enough for our 
    static #uniqueId = () => {
            const dateString = Date.now().toString(36);
            const randomness = Math.random().toString(36).substring(2);
            return dateString + randomness;
          };

    static createRandom(nrOfItems = 1) {
        if (typeof (nrOfItems) !== 'number')
            throw new TypeError('nrOfItems nust me a number')

        let result = [];
        for (let i = 0; i < nrOfItems; i++) {
            result.push(this.#_createRandom());
        }

        if (result.length == 1)
            return result[0]; // return the object

        //otherwise, return the array
        return result;
    }
}

//exporting according to ES6 modules, lets try default
export default studentScore;


// test the class
/*
console.group('Create some studens and sort the list')
const aStudent = studentScore.createRandom();
console.log(aStudent)
console.log('' + aStudent);

let students = studentScore.createRandom(10);
console.log(students);
students = students.sort((first, second) => {

    //lets simply sort the students based on avg score
    return first.scores.avg - second.scores.avg;
});

// looping through array with for..of
let avg = 0;
for (const s of students) {
    avg += (s.scores.avg/students.length);
}
console.log(avg);

//looping with map
avg = 0
students.map((s) => avg += s.scores.avg/students.length);
console.log(avg);

//looping with a reducer
//prev is result of previous return of the arror function calculation. Initial value is 0
avg = students.reduce((prev, current) => {return prev + current.scores.avg/students.length;}, 0);
console.log(avg);

//or even shorter
avg = students.reduce((prev, current) => prev + current.scores.avg/students.length, 0);
console.log(avg);

console.groupEnd();
*/


