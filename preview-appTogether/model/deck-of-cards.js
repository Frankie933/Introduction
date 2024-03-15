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

        let suits = ["Clubs", "Spades", "Diamonds", "Hearts"];
        let top_offset = ["-135px", "-150px", "-170px", "-190px"];

        let numeral = ["Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten",
            "Knight", "Queen", "King", "Ace"];

        let suitOrder = 0;
        for (const s of suits) {

            let cardVal = 2;
            for (const n of numeral) {

                //this is only to map it to the sprite image
                const spriteCol = (cardVal-2) % 7;
                let spriteRow = suitOrder * 2;
                if (cardVal > 8)
                    spriteRow++;

                let card = Object.create(prototypeCard,
                    {
                        suit: { value: s }, numeral: { value: n }, value: { value: cardVal },
                        suitOrder: { value: suitOrder }, numeralOrder: { value: cardVal }, value: { value: cardVal },
                        spriteRow: { value: spriteRow }, spriteCol: { value: spriteCol },
                        spriteTopOffset: { value: top_offset[suitOrder] }
                    });
                this.#cards.push(card);
                cardVal++;
            }
            suitOrder++;
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

    shuffle() {

        //Shuffle between 100 and 1000 times
        let nrShuffles = rnd(100, 999 + 1);
        for (let i = 0; i < nrShuffles; i++) {

            let loCard = rnd(0, this.#cards.length);
            let hiCard = rnd(0, this.#cards.length);

            //swap the cards
            [this.#cards[loCard], this.#cards[hiCard]] = [this.#cards[hiCard], this.#cards[loCard]];
        }

        //randomNumber = Math.floor(Math.random() * (max - min) ) + min;
        //non inclusive max, but inclusive min
        function rnd(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
    }

    sort() {
        return this.#cards.sort((card1, card2) => {
            if (card1.suitOrder !== card2.suitOrder)
                return card1.suitOrder - card2.suitOrder;

            return card1.numeralOrder - card2.numeralOrder;
        })
    }
}

export { deckOfCards }
