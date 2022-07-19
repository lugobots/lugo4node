import {Bot, GameSnapshotReader, Lugo, Mapper, PLAYER_STATE} from '@lugobots/lugo4node'


export class MyBot implements Bot {
    side: Lugo.Team.Side;
    number: number;

    initPosition: Lugo.Point;

    mapper: Mapper;

    /**
     *
     * @param {Lugo.Side} side
     * @param number
     * @param initPosition
     * @param mapper
     */
    constructor(side: Lugo.Team.Side, number: number, initPosition: Lugo.Point, mapper: Mapper) {
        this.number = number
        this.mapper = mapper
        this.initPosition = initPosition
        mapper.getRegionFromPoint(initPosition)
    }

    private makeReader(snapshot: Lugo.GameSnapshot): { reader: GameSnapshotReader, me: Lugo.Player } {
        const reader = new GameSnapshotReader(snapshot, this.side)
        const me = reader.getPlayer(this.side, this.number)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        return {reader, me}
    }

    onDisputing(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot): Lugo.OrderSet | null {
        try {
            const {reader, me} = this.makeReader(snapshot)
            const ballPosition = reader.getBall().getPosition()

            const ballRegion = this.mapper.getRegionFromPoint(ballPosition)
            const myRegion = this.mapper.getRegionFromPoint(this.initPosition)

            let moveDest = this.initPosition
            if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
                Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
                moveDest = ballPosition
            }
            const moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), moveDest)
            // const catchOrder = reader.
            const orderSet = new Lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("mi mi mi")
            orderSet.setOrdersList([moveOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onDefending(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot): Lugo.OrderSet | null {
        try {
            const {reader, me} = this.makeReader(snapshot)
            const ballPosition = snapshot.getBall().getPosition()
            const ballRegion = this.mapper.getRegionFromPoint(ballPosition)
            const myRegion = this.mapper.getRegionFromPoint(this.initPosition)

            let moveDest = this.initPosition
            if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
                Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
                moveDest = ballPosition
            }
            const moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), moveDest)
            const catchOrder = reader.makeOrderCatch()

            const orderSet = new Lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("trying to catch the ball")
            orderSet.setOrdersList([moveOrder, catchOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onHolding(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot): Lugo.OrderSet | null {
        try {
            const {reader, me} = this.makeReader(snapshot)

            const myGoalCenter = this.mapper.getRegionFromPoint(reader.getOpponentGoal().getCenter())
            const currentRegion = this.mapper.getRegionFromPoint(me.getPosition())

            let myOrder;
            if (Math.abs(currentRegion.getRow() - myGoalCenter.getRow()) <= 1 &&
                Math.abs(currentRegion.getCol() - myGoalCenter.getCol()) <= 1) {
                myOrder = reader.makeOrderKickMaxSpeed(snapshot.getBall(), reader.getOpponentGoal().getCenter())
            } else {
                myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), reader.getOpponentGoal().getCenter())
            }

            const orderSet = new Lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("attack!")
            orderSet.setOrdersList([myOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onSupporting(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot): Lugo.OrderSet | null {
        try {
            const {reader, me} = this.makeReader(snapshot)
            const ballHolderPosition = snapshot.getBall().getPosition()
            const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), ballHolderPosition)

            const orderSet = new Lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("supporting")
            orderSet.setOrdersList([myOrder])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    asGoalkeeper(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot, state: PLAYER_STATE): Lugo.OrderSet | null {
        try {
            const {reader, me} = this.makeReader(snapshot)
            let position = snapshot.getBall().getPosition()
            if (state !== PLAYER_STATE.DISPUTING_THE_BALL) {
                position = reader.getMyGoal().getCenter()
            }

            const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), position)

            const orderSet = new Lugo.OrderSet()
            orderSet.setTurn(snapshot.getTurn())
            orderSet.setDebugMessage("supporting")
            orderSet.setOrdersList([myOrder, reader.makeOrderCatch()])
            return orderSet
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    gettingReady(snapshot: Lugo.GameSnapshot): void {

    };
}


export const PLAYER_POSITIONS = {
    1: {Col: 0, Row: 0},
    2: {Col: 1, Row: 1},
    3: {Col: 2, Row: 2},
    4: {Col: 2, Row: 3},
    5: {Col: 1, Row: 4},
    6: {Col: 3, Row: 1},
    7: {Col: 3, Row: 2},
    8: {Col: 3, Row: 3},
    9: {Col: 3, Row: 4},
    10: {Col: 4, Row: 3},
    11: {Col: 4, Row: 2},
}
