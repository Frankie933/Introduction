//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

// To use ES6 modules, export and import, you need to create a package.json and set the type ot module.
// - open a terminal in your script directory and type: npm init -y
// - open the package file and add the line at the top: "type":"module", 

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import
import { prototypeCard } from './playing-card.js';

class deckOfCards {

    #cards = [];  //hidden, do not wnt any children to tamper with my cards

    constructor() {

        this.freshDeck();
    }

    freshDeck() {

        let suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
        let numeral = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
            "Knight", "Queen", "King", "Ace"];

        for (const s of suits) {

            let cardVal = 2;
            for (const n of numeral) {

                let card = Object.create(prototypeCard,
                    {
                        suit: { value: s }, numeral: { value: n }, value: { value: cardVal },
                        spriteRow: { value: 0, writable: true }, spriteCol: { value: 0, writable: true }
                    });
                this.#cards.push(card);
                cardVal++;
            }
        }
    }

    get count() { return this.#cards.length }

    dealOne() {

        if (this.#cards.length <= 0)
            throw new TypeError('Deck is empty');

        return this.#cards.pop();
    }

    // It is easy to make a class iterable, using the yield techniquie, but instead of 
    // function* name() use *[Symbol.iterator]()
    *[Symbol.iterator]() {
        for (let i = 0; i < this.#cards.length; i++) {
            yield this.#cards[i];
        }
        return;
    }
}

//Test it
const deck = new deckOfCards();
console.log(deck.count);
console.log('' + deck.dealOne());
console.log('' + deck.dealOne());
console.log('' + deck.dealOne());
console.log('' + deck.dealOne());
console.log(deck.count);

//the iterator allows me to use the ...operator
let remainingCards = [...deck];
console.log(remainingCards);



/* Exercise
1. write a function shuffle() that shuffles the deck
2. In a playing card, introduce to properties, suitOrder, 0 to 3, and numeralOrder 2 to 14, and
   set them when creating the deck. 
3. write a function sort() that sorts the deck in the suit and numeral order using the properties introduced in 
   exercise 2
*/