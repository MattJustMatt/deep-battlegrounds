import _ from 'underscore';

class CombatResult {
    constructor(winningSide, losingSide, isTie, damageDealt) {
        this.winningSide = _.clone(winningSide);
        this.losingSide = _.clone(losingSide);
        this.isTie = isTie;
        this.damageDealt = damageDealt;
    }
}

export default CombatResult;