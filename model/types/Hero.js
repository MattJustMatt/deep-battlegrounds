class Hero {
    constructor(name, health, shieldTier) {
        this.name = name;
        this.health = health;
        this.shieldTier = this.shieldTier;

        this.shield = 0;
        this.tavernTier = 1;
    }

    hit(damage) {
        if (this.shield > 0) {
            let remainder = this.shield-damage;
            this.shield = remainder < 0 ? 0 : this.shield-damage;

            if (remainder < 0) {
                this.health += remainder;
            }
        } else {
            this.health -= damage;
        }
    }
}

export default Hero;