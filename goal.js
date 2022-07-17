export class Goal {
    /**
     *
     * @param place
     * @param center
     * @param topPole
     * @param bottomPole
     */
    constructor(place, center, topPole, bottomPole) {
        this._center = center;
        this._place = place;
        this._topPole = topPole;
        this._bottomPole = bottomPole;
    }
    get center() {
        return this._center;
    }
    get place() {
        return this._place;
    }
    get topPole() {
        return this._topPole;
    }
    get bottomPole() {
        return this._bottomPole;
    }
}
