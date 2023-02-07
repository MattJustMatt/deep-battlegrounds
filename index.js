import GameCtrl from './controllers/GameCtrl.js';
import HeroModel from './model/HeroModel.js';
import BoardModel from './model/BoardModel.js';

console.log("--Hearthstone AutoBattler--")

let heroModel = new HeroModel();
let hero1 = heroModel.getHeroByName("Chenvala");
let hero2 = heroModel.getHeroByName("Millhouse");

let boardModel = new BoardModel();
let demoBoard = boardModel.getDemoBoard(hero1, hero2);
let gameController = new GameCtrl(demoBoard);

let iterations = 1;
let start = performance.now();
for (let i = 0; i < iterations; i++) {
    gameController.replaceBoard(boardModel.getDemoBoard(hero1, hero2));
    gameController.battle();
}
let end = performance.now();
console.log(`Time elapsed: ${Math.round(end - start)} ms`);

gameController.resultsController.printStatistics();