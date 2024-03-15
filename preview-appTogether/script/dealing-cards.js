
//Just to ensure we force js into strict mode in HTML scrips - we don't want any sloppy code
'use strict';  // Try without strict mode

import { deckOfCards } from '../model/deck-of-cards.js';


//https://developer.mozilla.org/en-US/docs/Web/API/Element/transitionend_event
//https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty


const flexItem = document.querySelector('.flexItem');
const flipItems = document.querySelectorAll('.flexContainer .horizontalFlip');


//Changes for Exercise 2
const btnDeal = document.querySelector('#btnDeal');

/*
//add a transition end event to first flexItem
flexItem.addEventListener('transitionend', () => {

  //check if element is hovered
  //only deal a new card when hovering over the cards to ensure back is fully visible
  const hovered = document.querySelector('.flexItem:hover');
  if (hovered?.className === 'flexItem horizontalFlip') {

    dealHand();
  }
});
*/

let cardsHidden = false;  //used to catch only 1st transition event
flexItem.addEventListener('transitionend', () => {

  //if cards aready shown ignore the transition event
  if (!cardsHidden) return;

  //cards hidden - deal from a button click
  dealHand();

  //show the card front
  const flipItems = document.querySelectorAll('.flexContainer .horizontalFlip');
  flipItems.forEach(item => {

    //flexItem.style.setProperty('transform', 'rotateY(180deg);');
    item.setAttribute('style', 'transform: unset;');
    cardsHidden = false;
  })

});

function dealHand() {
  //Changes for exercise 1
  const cardClasses = ['.cardOne', '.cardTwo', '.cardThree', '.cardFour', '.cardFive']
  for (const cardClass of cardClasses) {

    try {
      const newCard = deck.dealOne();

      const cardImg = document.querySelector('.playingCard.front' + cardClass);
      cardImg.style.setProperty('--topOffset', newCard.spriteTopOffset);
      cardImg.style.setProperty('--cardRow', newCard.spriteRow);
      cardImg.style.setProperty('--cardCol', newCard.spriteCol);
    }
    catch {
      btnDeal.disabled = true;
    }
  }
}

//Changes for Exercise 2
btnDeal.addEventListener('click', () => {

  deck.shuffle();

  //initiate the 3D transform
  flipItems.forEach(item => {

    item.setAttribute('style', 'transform: rotateY(180deg);');
  })

  //used not to listed to the transitioned event when visible
  cardsHidden = true;
});

const deck = new deckOfCards();

/*
//Test that I have the deck of cards
const deck = new deckOfCards();
console.log(deck.count);
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(deck.count);

deck.shuffle();
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(deck.count);

deck.sort();
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(''+deck.dealOne());
console.log(deck.count);

console.log(...deck);
*/
