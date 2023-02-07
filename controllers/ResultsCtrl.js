class ResultsCtrl {
    constructor(hero1, hero2) {
        this.hero1 = hero1;
        this.hero2 = hero2;
        this.results = [];

        this.hero1Wins = 0;
        this.hero1Losses = 0;
        this.hero1Lethals = 0;
        this.hero1WinPercentage;
        this.hero1MinDamage;
        this.hero1MaxDamage;
        this.hero1AvgDamage;

        this.hero2Wins = 0;
        this.hero2Losses = 0;
        this.hero2Lethals = 0;
        this.hero2WinPercentage;
        this.hero2MinDamage;
        this.hero2MaxDamage;
        this.hero2AvgDamage;

        this.ties = 0;
    }

    addResult(result) {
        this.results.push(result);
    }

    printStatistics() {
        this.#processResults();
        console.log("--STATISTICS--")
        console.log(`${this.hero1.name} wins ${this.hero1.wins} losses ${this.hero1.hero1Losses}`);
        console.log(this.hero2.name + " Wins " + this.hero2Wins);
        console.log(`Ties: ${ this.ties }`)
    }

    #processResults() {
        let hero1Damages = [];
        let hero2Damages = [];

        this.results.forEach((result) => {
            if (result.isTie) {
                this.ties++;
            } else {
                if (result.winningSide.hero === this.hero1) {
                    this.hero1Wins++;

                    hero2Damages.push(result.damageDealt);
                } else if (result.winningSide.hero === this.hero2) {
                    this.hero2Wins++;
                    
                    hero1Damages.push(result.damageDealt);
                }
            }
        });

        let hero1damageProcessed = this.#minMaxAvg(hero1Damages);
        let hero2damageProcessed = this.#minMaxAvg(hero2Damages);
        this.hero1MinDamage = hero1damageProcessed.min;
        this.hero1MaxDamage = hero1damageProcessed.max;
        this.hero1AvgDamage = hero1damageProcessed.avg;

        this.hero2MinDamage = hero2damageProcessed.min;
        this.hero2MaxDamage = hero2damageProcessed.max;
        this.hero2AvgDamage = hero2damageProcessed.avg;
    }

    #minMaxAvg(arr) {
        if (arr.length === 0) return {};
        
        let min = arr[0];
        let max = arr[0];
        let sum = 0;
      
        for (let i = 0; i < arr.length; i++) {
          let current = arr[i];
          min = Math.min(min, current);
          max = Math.max(max, current);
          sum += current;
        }
      
        return {
          min: min,
          max: max,
          avg: sum / arr.length
        };
      }
}

export default ResultsCtrl;