import {Point} from "./pb/physics_pb";
import {Team} from "./pb/server_pb";

export class Goal {
    private readonly _center: Point;
    private readonly _place: Team.Side;
    private readonly _topPole: Point;
    private readonly _bottomPole: Point;

    /**
     *
     * @param place
     * @param center
     * @param topPole
     * @param bottomPole
     */
    constructor(place: Team.Side, center: Point, topPole: Point, bottomPole: Point) {
        this._center = center;
        this._place = place;
        this._topPole = topPole;
        this._bottomPole = bottomPole;
    }

    getCenter(): Point {
        return this._center;
    }

    getPlace(): Team.Side {
        return this._place;
    }

    getTopPole(): Point {
        return this._topPole;
    }

    getBottomPole(): Point {
        return this._bottomPole;
    }

}
