import logger from '../../logger.js';

class Card {
    constructor(name, tier, hp, attack, hasTaunt, hasPoison, hasShield, hasReborn, deathrattles) {
        this.name = name;
        this.tier = tier;
        this.hp = hp;
        this.attack = attack;
        this.hasTaunt = hasTaunt;
        this.hasPoison = hasPoison;
        this.hasShield = hasShield;
        this.hasReborn = hasReborn;
        this.deathrattles = deathrattles;
        
        this.alive = true;
    }
    
    setEnemies(enemies) {
        this.enemies = enemies;
    }

    setFriendlies(friendlies) {
        this.friendlies = friendlies;
    }

    doAttack() {
        let target = this.getAttackTarget();
        target.receiveAttack(this);
        this.receiveAttack(target);
    }

    receiveAttack(source) {
        let damage = source.attack;

        if (this.hp < 0) {
            throw new Error(this.name + " received attack but health is already 0");
        }

        if (this.hasShield) {
            damage = 0;
            this.hasShield = false;
        }

        this.hp = this.hp - damage;
        if (this.hp <= 0) {
            this.die();
        }
    }

    die() {
        if (this.deathrattles.length > 0) {
            // TODO: Deathrattles
        }

        this.alive = false;
        logger.log("High", this.toString() + " HAS DIED");
    }

    getAttackTarget() {
        let availableTargets = this.enemies.filter((enemy) => { return enemy.alive });

        let tauntCards = [];
        availableTargets.forEach((card) => {
            if (card.hasTaunt) tauntCards.push(card);
        });
        if (tauntCards.length > 0) availableTargets = tauntCards;

        let randomSelection = Math.floor(Math.random() * availableTargets.length);
        return availableTargets[randomSelection];
    }

    toString() {
        return `[${ this.name.toUpperCase() }] ${ this.attack }/${ this.hp }`
    }
}

export default Card;
