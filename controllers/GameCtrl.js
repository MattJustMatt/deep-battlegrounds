import BoardStates from '../model/types/enum/BoardStates.js'
import _ from 'lodash';
import GameView from '../view/GameView.js';
import ResultsCtrl from './ResultsCtrl.js'
import CombatResult from '../model/CombatResult.js';
import logger from '../logger.js';

class GameCtrl {
    constructor(boardModel) {
        this.boardState = BoardStates.BUILDING;

        this.boardModel = boardModel;
        this.hero1 = this.boardModel.side1.hero;
        this.hero2 = this.boardModel.side2.hero;
        this.side1 = this.boardModel.side1;
        this.side2 = this.boardModel.side2;

        this.attackingSide;
        this.defendingSide;

        this.resultsController = new ResultsCtrl(this.hero1, this.hero2);

        this.gameView = new GameView();
    }

    replaceBoard(boardModel) {
        if (this.boardState !== BoardStates.BUILDING) {
            throw new Error("Can't replace board when playing");
        }

        this.boardModel = boardModel;
        this.hero1 = this.boardModel.side1.hero;
        this.hero2 = this.boardModel.side2.hero;
        this.side1 = this.boardModel.side1;
        this.side2 = this.boardModel.side2;

        this.attackingSide;
        this.defendingSide;
    }

    getSides() {
        return [this.side1, this.side2];
    }

    #transitionState(targetState) {
        if (targetState === this.state) throw new Error(`Attempted to set board state to current state ${ this.targetState }`);

        if (targetState === BoardStates.PLAYING) {
            // Inform sides of their friends and enemies
            this.side1.cards.forEach((card) => {
                card.setFriendlies(this.side1.cards);
                card.setEnemies(this.side2.cards);
            });
            this.side2.cards.forEach((card) => {
                card.setFriendlies(this.side2.cards);
                card.setEnemies(this.side1.cards);
            });
        }

        this.boardState = targetState;
    }

    battle() {
        this.#transitionState(BoardStates.PLAYING);
        
        // Calculate who plays first and set them as the attacking player
        // If sides have the same number of cards, first attacker is random otherwise the player with the most cards goes first.
        logger.log("High", `Side one has ${ this.side1.getAliveCards().length } cards // Side two has ${ this.side2.getAliveCards().length } cards`)
        if (this.side1.getAliveCards().length === this.side2.getAliveCards().length) {
            this.attackingSide = Math.random() >= 0.5 ? this.side1 : this.side2; //TODO: Check if this is truly 50/50
            this.defendingSide = (this.attackingSide === this.side1) ? this.side2 : this.side1;
            logger.log("High", "[BOARD CONTROLLER] Sides have the same number of cards. Random attacker chosen: " + this.attackingSide.hero.name);
        } else {
            this.attackingSide = this.side1.getAliveCards().length > this.side2.getAliveCards.length ? this.side1 : this.side2;
            this.defendingSide = (this.attackingSide === this.side1) ? this.side2 : this.side1;
            logger.log("High", "[BOARD CONTROLLER] One side has more cards: " + this.attackingSide.hero.name);
        }
        
        let tickCount = 0;
        while (this.#shouldKeepRunning()) {
            this.gameView.render(this);

            this.attackingSide.tick();

            // Flip attacking side after each tick
            if (this.attackingSide === this.side1) {
                this.attackingSide = this.side2;
                this.defendingSide = this.side1;
            } else {
                this.attackingSide = this.side1;
                this.defendingSide = this.side2;
            }
            
            tickCount++;
        }

        logger.log("Medium", "[BOARD CONTROLLER] Combat over!");

        // Ties can happen even if both sides have cards (e.g. both cards have zero attack)
        let tie = this.side1.getAliveCards().length === this.side2.getAliveCards().length;
        let combatResult;
        if (!tie) {
            let winningSide = this.attackingSide;
            let losingSide = this.defendingSide;
            logger.log("Medium", "[BOARD CONTROLLER] Winning side: " + winningSide.hero.name);

            let damage = this.#getDamage(winningSide, losingSide);
            combatResult = new CombatResult(winningSide, losingSide, false, damage);
            losingSide.hero.hit(damage);
        } else {
            logger.log("Medium", "[BOARD CONTROLLER] TIE!");
            combatResult = new CombatResult(this.side1, this.side2, true, 0);
        }

        this.resultsController.addResult(combatResult);
        
        // Re-render the final board state
        this.gameView.render(this);

        // Restore
        this.#transitionState(BoardStates.BUILDING);
    }

    #getDamage(winningSide, losingSide) {
        let totalCardTiers = winningSide.getAliveCards().reduce((sum, currentCard) => { return sum + currentCard.tier }, 0);
        let damage = totalCardTiers + winningSide.hero.tavernTier;
        logger.log("High", "[BOARD CONTROLLER] Dealing damage to " + losingSide.hero.name + ": " + damage);

        return damage;
        
    }

    #shouldKeepRunning() {
        if (this.attackingSide.getAliveCards().length === 0 || this.defendingSide.getAliveCards().length === 0) {
            return false;
        }

        // We check for total attack, since zero attack cards can result in stalemate (counted as a tie)
        let attackerTotalAttack = this.attackingSide.getAliveCards().reduce((sum, currentCard) => { return sum + currentCard.attack }, 0);
        let defenderTotalAttack = this.defendingSide.getAliveCards().reduce((sum, currentCard) => { return sum + currentCard.attack }, 0);
        return attackerTotalAttack > 0 || defenderTotalAttack > 0;
    }
}

export default GameCtrl;