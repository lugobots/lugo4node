import { Point } from "./pb/physics_pb";
import { Team } from "./pb/server_pb";
export declare class Goal {
    private readonly _center;
    private readonly _place;
    private readonly _topPole;
    private readonly _bottomPole;
    /**
     *
     * @param place
     * @param center
     * @param topPole
     * @param bottomPole
     */
    constructor(place: Team.Side, center: Point, topPole: Point, bottomPole: Point);
    getCenter(): Point;
    getPlace(): Team.Side;
    getTopPole(): Point;
    getBottomPole(): Point;
}
