import cardDictionary from './db/cards.js';
import Card from './types/Card.js';

class CardModel {
    constructor() {
        this.cards = cardDictionary;
    }

    getAllCards() {

    }

    getCardByName(name) {
        for (let i = 0; i < this.cards.length; i++) {
            if (this.cards[i].name === name) {
                return createCardFromDictionary(this.cards[i]);
            }
        }

        return;
    }
}

function createCardFromDictionary(dictionaryCard) {
    return new Card(dictionaryCard.name,
         dictionaryCard.tier, 
         dictionaryCard.hp, 
         dictionaryCard.attack, 
         dictionaryCard.hasTaunt, 
         dictionaryCard.hasPoison, 
         dictionaryCard.hasShield, 
         dictionaryCard.hasReborn, 
         dictionaryCard.deathrattles
    );
}

export default CardModel;