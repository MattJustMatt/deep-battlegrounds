import heroDictionary from './db/heroes.js';
import Hero from './types/Hero.js';

class HeroModel {
    constructor() {
        this.heros = heroDictionary;
    }

    getAllHeros() {

    }

    getHeroByName(name) {
        for (let i = 0; i < this.heros.length; i++) {
            if (this.heros[i].name === name) {
                return createHeroFromDictionary(this.heros[i]);
            }
        }

        return;
    }
}

function createHeroFromDictionary(dictionaryHero) {
    return new Hero(dictionaryHero.name,
        dictionaryHero.health,
        dictionaryHero.shieldTier
    );
}

export default HeroModel;