
import { Point } from "./pb/physics_pb";
import { Team } from "./pb/server_pb";
import { SPECS } from "./specs";


const homeGoalCenter = new Point()
homeGoalCenter.setX(0)
homeGoalCenter.setY(SPECS.MAX_Y_COORDINATE / 2)

const homeGoalTopPole = new Point()
homeGoalTopPole.setX(0)
homeGoalTopPole.setY(SPECS.GOAL_MAX_Y)

const homeGoalBottomPole = new Point()
homeGoalBottomPole.setX(0)
homeGoalBottomPole.setY(SPECS.GOAL_MIN_Y)


const awayGoalCenter = new Point()
awayGoalCenter.setX(SPECS.MAX_X_COORDINATE)
awayGoalCenter.setY(SPECS.MAX_Y_COORDINATE / 2)


const awayGoalTopPole = new Point()
awayGoalTopPole.setX(SPECS.MAX_X_COORDINATE)
awayGoalTopPole.setY(SPECS.GOAL_MAX_Y)

const awayGoalBottomPole = new Point()
awayGoalBottomPole.setX(SPECS.MAX_X_COORDINATE)
awayGoalBottomPole.setY(SPECS.GOAL_MIN_Y)




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

export const AWAY_GOAL = new Goal(
    Team.Side.AWAY,
    awayGoalCenter,
    awayGoalTopPole,
    awayGoalBottomPole
)
export const HOME_GOAL = new Goal(
    Team.Side.HOME,
    homeGoalCenter,
    homeGoalTopPole,
    homeGoalBottomPole
)
