
class GameView {
    constructor() {

    }

    render(board) {
        let preppedBoardState = [
            { hero: `${board.side1.hero.name} (${board.side1.hero.health}/${board.side1.hero.shield})`, cards: board.side1.getAliveCards().toString() },
            { hero: `${board.side2.hero.name} (${board.side2.hero.health}/${board.side2.hero.shield})`, cards: board.side2.getAliveCards().toString() }
        ];

        console.table(preppedBoardState);
    }
}

export default GameView;

