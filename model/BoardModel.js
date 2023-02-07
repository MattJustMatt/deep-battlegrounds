import Board from "./types/Board.js";
import BoardSide from './types/BoardSide.js';
import CardModel from './CardModel.js';

class BoardModel {
    boards = [];

    constructor() {
        this.cardModel = new CardModel();
    }

    getDemoBoard(hero1, hero2) {
        let side1 = new BoardSide(hero1);
        let side2 = new BoardSide(hero2);

        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side1.addCard(this.cardModel.getCardByName("Dragonspawn Lieutenant"))
        side2.addCard(this.cardModel.getCardByName("Rockpool Hunter"));
        side2.addCard(this.cardModel.getCardByName("Rockpool Hunter"));

        let demoBoard = new Board(side1, side2);
        return demoBoard;
    }
}

export default BoardModel;