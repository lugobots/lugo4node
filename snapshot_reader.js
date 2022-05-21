'use strict';
require('./pb/server_pb')
const field = require('./field')
const vectors = require('./vector')


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

const homeGoal = new Goal(
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

const awayGoal = new Goal(
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
    isBallHolder(player) {
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
    getMyGoal() {
        if (this.#my_side === proto.lugo.Team.Side.HOME) {
            return homeGoal
        }
        return awayGoal
    }

    /**
     *
     * @returns {Goal}
     */
    getOpponentGoal() {
        console.log(`SIDE ${this.#my_side}, HOME: ${proto.lugo.Team.Side.HOME}`)
        if (this.#my_side === proto.lugo.Team.Side.HOME) {
            return awayGoal
        }
        return homeGoal
    }

    /**
     *
     * @param {proto.lugo.Team.Side} side
     * @param {number} number
     * @returns {proto.lugo.Player}
     */
    getPlayer(side, number) {
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

    /**
     *
     * @param origin
     * @param target
     * @return {proto.lugo.Order}
     */
    makeOrderMoveMaxSpeed(origin, target) {
        return this.makeOrderMove(origin, target, field.PLAYER_MAX_SPEED)
    }

    /**
     *
     * @param origin
     * @param target
     * @param speed
     * @returns {proto.lugo.Order}
     */
    makeOrderMove(origin, target, speed) {
        let direction = vectors.NewVector(origin, target)
        direction = vectors.normalize(direction)
        return this._makeOrderMoveFromVector(direction, speed)
    }

    goForward() {
        let direction = East
        if (this.#my_side === proto.lugo.Team.Side.AWAY) {
            direction = West
        }
        return this._makeOrderMoveFromVector(direction, field.PLAYER_MAX_SPEED)
    }

    goBackward() {
        let direction = West
        if (this.#my_side === proto.lugo.Team.Side.AWAY) {
            direction = East
        }
        return this._makeOrderMoveFromVector(direction, field.PLAYER_MAX_SPEED)
    }

    goLeft() {
        let direction = North
        if (this.#my_side === proto.lugo.Team.Side.AWAY) {
            direction = South
        }
        return this._makeOrderMoveFromVector(direction, field.PLAYER_MAX_SPEED)
    }

    goRight() {
        let direction = South
        if (this.#my_side === proto.lugo.Team.Side.AWAY) {
            direction = North
        }
        return this._makeOrderMoveFromVector(direction, field.PLAYER_MAX_SPEED)
    }

    /**
     *
     * @param {proto.lugo.Vector} direction
     * @param {number} speed
     * @returns {!proto.lugo.Order}
     * @private
     */
    _makeOrderMoveFromVector(direction, speed) {
        const velocity = new proto.lugo.Velocity()
        velocity.setDirection(direction)
        velocity.setSpeed(speed)

        const moveOrder = new proto.lugo.Move()
        moveOrder.setVelocity(velocity)
        return new proto.lugo.Order().setMove(moveOrder)
    }

    // func MakeOrderJump(origin, target proto.Point, speed float64) (*proto.Order_Jump, error) {
    //     vec, err := proto.NewVector(origin, target)
    //     if err != nil {
    //         return nil, err
    //     }
    //     vel := proto.NewZeroedVelocity(*vec.Normalize())
    //     vel.Speed = speed
    //     return &proto.Order_Jump{Jump: &proto.Jump{Velocity: &vel}}, nil
    // }

    /**
     *
     * @param {proto.lugo.Ball} ball
     * @param {proto.lugo.Point} target
     * @param {number} speed
     * @returns {proto.lugo.Order}
     */
    makeOrderKick(ball, target, speed) {
        const ballExpectedDirection = vectors.NewVector(ball.getPosition(), target)

        // the ball velocity is summed to the kick velocity, so we have to consider the current ball direction
        const diffVector = vectors.sub(ballExpectedDirection, ball.getVelocity().getDirection())

        const newVelocity = new proto.lugo.Velocity()
        newVelocity.setSpeed(speed)
        newVelocity.setDirection(vectors.normalize(diffVector))
        return new proto.lugo.Order().setKick(new proto.lugo.Kick().setVelocity(newVelocity))
    }

    /**
     *
     * @param {proto.lugo.Ball} ball
     * @param {proto.lugo.Point} target
     * @returns {proto.lugo.Order}
     */
    makeOrderKickMaxSpeed(ball, target) {
        return this.makeOrderKick(ball, target, field.BALL_MAX_SPEED)
    }

    /**
     *
     * @returns {!proto.lugo.Order}
     */
    makeOrderCatch() {
        return new proto.lugo.Order().setCatch(new proto.lugo.Catch())
    }

}

const east = vectors.normalize(new proto.lugo.Vector().setX(1))
const west = vectors.normalize(new proto.lugo.Vector().setX(-1))
const south = vectors.normalize(new proto.lugo.Vector().setY(-1))
const north = vectors.normalize(new proto.lugo.Vector().setY(1))

const northEast = vectors.normalize(new proto.lugo.Vector().setX(1).setY(1))
const northWest = vectors.normalize(new proto.lugo.Vector().setX(-1).setY(1))
const southEast = vectors.normalize(new proto.lugo.Vector().setX(1).setY(-1))
const southWest = vectors.normalize(new proto.lugo.Vector().setX(-1).setY(-1))


module.exports = {
    GameSnapshotReader,
    Goal,
    homeGoal,
    awayGoal,
    directions: {
        east,
        west,
        south,
        north,
        northEast,
        northWest,
        southEast,
        southWest,
    }
}
