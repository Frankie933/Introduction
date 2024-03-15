//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

// To enable ES6 Modules, export and import you need to have a package.json in your js applications root directory
// Open terminal in your applications root directory and type: npm init -y
// Then add the line at the top   "type": "module",    

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export

const prototypeCard = {
    get cardColor() {    //note, no parameter
        switch (this.suit) {    //note, I use this
            case 'Heart':
            case 'Diamond': return 'red';
        }
        return 'black';
    },
    get cardFaceOrNumeral() {    //note, I can now change it to a getter
        switch (this.numeral) {
            case 'Knight':
            case 'Queen':
            case 'King': return 'face';
        }
        return 'numeral';
    },
    toString: function () { return `${this.suit} of ${this.numeral} is a ${this.cardColor} ${this.cardFaceOrNumeral} card` }
}

/*
//Just to test creating a couple of cards
let card1 = Object.create(prototypeCard,
    {
        suit: { value: "Heart" }, numeral: { value: "Knight" }, value: { value: 13 },
        spriteRow: { value: 2, writable: true }, spriteCol: { value: 2, writable: true }
    });

console.log('' + card1);
*/
export {prototypeCard}
