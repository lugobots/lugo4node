'use strict';
require('./pb/server_pb')
const field = require('./field')

class Goal {
    constructor(place, center, topPole, bottomPole) {
        this._center = center;
        this._place = place;
        this._topPole = topPole;
        this._bottomPole = bottomPole;
    }

    /**
     *
     * @return {proto.lugo.Point}
     */
    get center() {
        return this._center;
    }

    /**
     *
     * @return {proto.lugo.Point}
     */
    get place() {
        return this._place;
    }

    /**
     *
     * @return {proto.lugo.Point}
     */
    get topPole() {
        return this._topPole;
    }

    /**
     *
     * @return {proto.lugo.Point}
     */
    get bottomPole() {
        return this._bottomPole;
    }
}

const homeGoalCenter = new proto.lugo.Point()
homeGoalCenter.setX(0)
homeGoalCenter.setY(field.MAX_Y_COORDINATE / 2)

const homeGoalTopPole = new proto.lugo.Point()
homeGoalTopPole.setX(0)
homeGoalTopPole.setY(field.GOAL_MAX_Y)

const homeGoalBootomPole = new proto.lugo.Point()
homeGoalBootomPole.setX(0)
homeGoalBootomPole.setY(field.GOAL_MIN_Y)

const HomeGoal = new Goal(
    proto.lugo.Team.Side.HOME,
    homeGoalCenter,
    homeGoalTopPole,
    homeGoalBootomPole
)

const awayGoalCenter = new proto.lugo.Point()
awayGoalCenter.setX(field.MAX_X_COORDINATE)
awayGoalCenter.setY(field.MAX_Y_COORDINATE / 2)


const awayGoalTopPole = new proto.lugo.Point()
awayGoalTopPole.setX(field.MAX_X_COORDINATE)
awayGoalTopPole.setY(field.GOAL_MAX_Y)

const awayGoalBottomPole = new proto.lugo.Point()
awayGoalBottomPole.setX(field.MAX_X_COORDINATE)
awayGoalBottomPole.setY(field.GOAL_MIN_Y)

const AwayGoal = new Goal(
    proto.lugo.Team.Side.AWAY,
    awayGoalCenter,
    awayGoalTopPole,
    awayGoalBottomPole
)


class GameSnapshotReader {
    #my_side;
    /**
     * @type {proto.lugo.GameSnapshot}
     */
    #snapshot;

    constructor(snapshot, mySide) {
        this.#snapshot = snapshot
        this.#my_side = mySide

        console.log(this.#my_side, mySide, proto.lugo.Team.Side.HOME)
    }

    /**
     *
     * @returns { proto.lugo.Team}
     */
    getMyTeam() {
        return this.getTeam(this.#my_side)
    }

    /**
     * @param { proto.lugo.Team.Side} side
     * @returns
     */
    getTeam(side) {
        if (side === proto.lugo.Team.Side.HOME) {
            return this.#snapshot.getHomeTeam()
        }
        return this.#snapshot.getAwayTeam()
    }


    /**
     *
     * @param { proto.lugo.Player} player
     * @returns {boolean}
     */
    IsBallHolder(player) {
        const ball = this.#snapshot.getBall()

        return ball.getHolder() != null && ball.getHolder().getTeamSide() === player.getTeamSide() && ball.getHolder().getNumber() === player.getNumber()
    }

    /**
     *
     * @returns {proto.lugo.Team.Side}
     */
    GetOpponentSide() {
        if (this.#my_side === proto.lugo.Team.Side.HOME) {
            return proto.lugo.Team.Side.AWAY
        }
        return proto.lugo.Team.Side.HOME
    }

    /**
     *
     * @returns {Goal}
     */
    GetMyGoal() {
        console.log(this.#my_side, proto.lugo.Team.Side.HOME)
        if (this.#my_side === proto.lugo.Team.Side.HOME) {
            return HomeGoal
        }
        return AwayGoal
    }

    /**
     *
     * @returns {Goal}
     */
    GetOpponentGoal() {
        console.log(`SIDE ${this.#my_side}, HOME: ${proto.lugo.Team.Side.HOME}`)
        if (this.#my_side === proto.lugo.Team.Side.HOME) {
            return AwayGoal
        }
        return HomeGoal
    }

    /**
     *
     * @param {proto.lugo.Team.Side} side
     * @param {number} number
     * @returns {proto.lugo.Player}
     */
    GetPlayer(side, number) {
        const team = this.getTeam(side)
        if (team == null) {
            return null
        }
        for (const player of team.getPlayersList()) {
            if (player.getNumber() === number) {
                return player
            }
        }
        return null
    }

    // func MakeOrderMoveMaxSpeed(origin, target proto.Point) (*proto.Order_Move, error) {
    //     return MakeOrderMove(origin, target, PlayerMaxSpeed)
    // }

    // func MakeOrderMove(origin, target proto.Point, speed float64) (*proto.Order_Move, error) {
    //     vec, err := proto.NewVector(origin, target)
    //     if err != nil {
    //         return nil, err
    //     }
    //     vel := proto.NewZeroedVelocity(*vec.Normalize())
    //     vel.Speed = speed
    //     return &proto.Order_Move{Move: &proto.Move{Velocity: &vel}}, nil
    // }

    // func MakeOrderJump(origin, target proto.Point, speed float64) (*proto.Order_Jump, error) {
    //     vec, err := proto.NewVector(origin, target)
    //     if err != nil {
    //         return nil, err
    //     }
    //     vel := proto.NewZeroedVelocity(*vec.Normalize())
    //     vel.Speed = speed
    //     return &proto.Order_Jump{Jump: &proto.Jump{Velocity: &vel}}, nil
    // }

    // func MakeOrderKick(ball proto.Ball, target proto.Point, speed float64) (*proto.Order_Kick, error) {
    //     ballExpectedDirection, err := proto.NewVector(*ball.Position, target)
    //     if err != nil {
    //         return nil, err
    //     }

    //     diffVector, err := ballExpectedDirection.Sub(ball.Velocity.Direction)
    //     if err != nil {
    //         return nil, err
    //     }
    //     vel := proto.NewZeroedVelocity(*diffVector)
    //     vel.Direction.Normalize()
    //     vel.Speed = speed

    //     return &proto.Order_Kick{Kick: &proto.Kick{Velocity: &vel}}, nil
    // }

    // func MakeOrderKickMaxSpeed(ball proto.Ball, target proto.Point) (*proto.Order_Kick, error) {
    //     return MakeOrderKick(ball, target, BallMaxSpeed)

    // }

    // func MakeOrderCatch() *proto.Order_Catch {
    //     return &proto.Order_Catch{Catch: &proto.Catch{}}
    // }

    // func GoForward(side proto.Team_Side) *proto.Order_Move {
    //     forward := proto.East()
    //     if side == proto.Team_AWAY {
    //         forward = proto.West()
    //     }
    //     vel := proto.NewZeroedVelocity(forward)
    //     vel.Speed = PlayerMaxSpeed
    //     return &proto.Order_Move{Move: &proto.Move{Velocity: &vel}}
    // }

    // func GoBackward(side proto.Team_Side) *proto.Order_Move {
    //     backward := proto.West()
    //     if side == proto.Team_AWAY {
    //         backward = proto.East()
    //     }
    //     vel := proto.NewZeroedVelocity(backward)
    //     vel.Speed = PlayerMaxSpeed
    //     return &proto.Order_Move{Move: &proto.Move{Velocity: &vel}}
    // }

    // func GoRight(side proto.Team_Side) *proto.Order_Move {
    //     right := proto.South()
    //     if side == proto.Team_AWAY {
    //         right = proto.North()
    //     }
    //     vel := proto.NewZeroedVelocity(right)
    //     vel.Speed = PlayerMaxSpeed
    //     return &proto.Order_Move{Move: &proto.Move{Velocity: &vel}}
    // }

    // func GoLeft(side proto.Team_Side) *proto.Order_Move {
    //     left := proto.North()
    //     if side == proto.Team_AWAY {
    //         left = proto.South()
    //     }
    //     vel := proto.NewZeroedVelocity(left)
    //     vel.Speed = PlayerMaxSpeed
    //     return &proto.Order_Move{Move: &proto.Move{Velocity: &vel}}
    // }


}

module.exports = {GameSnapshotReader, Goal, HomeGoal, AwayGoal}