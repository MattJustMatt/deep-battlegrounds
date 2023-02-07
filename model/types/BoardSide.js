const SLOTMAX = 7;

class BoardSide {
    constructor(hero) {
        this.hero = hero;

        this.cards = [];
        this.attackingIndex = 0;
    }

    tick() {
        // Remove any dead cards
        this.cards.forEach((card) => {
            if (!card.alive) {
                let cardIndex = this.cards.indexOf(card);
                this.cards.splice(cardIndex, 1);
            }
        });

        // If we have no cards on the board, skip our turn
        if (this.cards.length === 0) return;

        // If we run out of cards, reset to the left most card
        if (this.attackingIndex >= this.cards.length) this.attackingIndex = 0;

        // Attack with our next card
        this.cards[this.attackingIndex].doAttack();

        this.attackingIndex++;
    }

    addCard(card) {
        if (this.cards.length > SLOTMAX) throw new Error("Attempted to add card to full side");

        // Add the card
        this.cards.push(card);
    }

    removeCard(card) {
        if (!this.cards.contains(card)) throw new Error("Attempted to remove card that doesn't exist on side");

        let cardIndex = this.cards.indexOf(card);
        this.cards.splice(cardIndex, 1);
    }

    getAliveCards() {
        return this.cards.filter((card) => card.alive);
    }
}

export default BoardSide;