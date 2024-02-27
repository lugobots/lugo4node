import { Bot, GameSnapshotInspector, Lugo, Mapper, PLAYER_STATE, Region } from '@lugobots/lugo4node';


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

    private isNear(regionOrigin : Region, destOrigin: Region) : boolean {
        const maxDistance = 2
        return Math.abs(regionOrigin.getRow() - destOrigin.getRow()) <= maxDistance &&
                Math.abs(regionOrigin.getCol() - destOrigin.getCol()) <= maxDistance
    }

    onDisputing(inspector: GameSnapshotInspector): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
        try {
            // the Lugo.GameSnapshot helps us to read the game state
            const orders = [];
            const me = inspector.getMe();
            const ballPosition = inspector.getBall().getPosition()

            const ballRegion = this.mapper.getRegionFromPoint(ballPosition)
            const myRegion = this.mapper.getRegionFromPoint(me.getPosition())


            // but if the ball is near to me, I will try to catch it
            if (this.isNear(ballRegion, myRegion)) {
                orders.push(inspector.makeOrderMoveMaxSpeed( ballPosition));
            }

            orders.push(inspector.makeOrderCatch());

            return orders;
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onDefending(inspector: GameSnapshotInspector): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
        try {
            const me = inspector.getMe();
            const ballPosition = inspector.getBall().getPosition()
            const ballRegion = this.mapper.getRegionFromPoint(ballPosition)
            const myRegion = this.mapper.getRegionFromPoint(this.initPosition)

            let moveDest = this.initPosition
            if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
                Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
                moveDest = ballPosition
            }
            const moveOrder = inspector.makeOrderMoveMaxSpeed( moveDest)
            const catchOrder = inspector.makeOrderCatch()

            return { orders: [moveOrder, catchOrder], debug_message: "trying to catch the ball" }
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onHolding(inspector: GameSnapshotInspector): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
        try {
            const me = inspector.getMe();

            const myGoalCenter = this.mapper.getRegionFromPoint(this.mapper.getAttackGoal().getCenter())
            const currentRegion = this.mapper.getRegionFromPoint(me.getPosition())

            let myOrder;
            if (Math.abs(currentRegion.getRow() - myGoalCenter.getRow()) <= 1 &&
                Math.abs(currentRegion.getCol() - myGoalCenter.getCol()) <= 1) {
                myOrder = inspector.makeOrderKickMaxSpeed(this.mapper.getAttackGoal().getCenter())
            } else {
                myOrder = inspector.makeOrderMoveMaxSpeed(this.mapper.getAttackGoal().getCenter())
            }


            return { orders: [myOrder], debug_message: "attack!" }
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    onSupporting(inspector: GameSnapshotInspector): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
        try {
            const me = inspector.getMe();
            const ballHolderPosition = inspector.getBall().getPosition()
            const myOrder = inspector.makeOrderMoveMaxSpeed( ballHolderPosition)

            return { orders: [myOrder], debug_message: "supporting" }
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    asGoalkeeper(inspector: GameSnapshotInspector, state: PLAYER_STATE): Lugo.Order[] | { orders: Lugo.Order[], debug_message: string } | null {
        try {
            const me = inspector.getMe();
            let position = inspector.getBall().getPosition()
            if (state !== PLAYER_STATE.DISPUTING_THE_BALL) {
                position = this.mapper.getDefenseGoal().getCenter()
            }

            const myOrder = inspector.makeOrderMoveMaxSpeed( position)


            return { orders: [myOrder, inspector.makeOrderCatch()], debug_message:  "supporting"}
        } catch (e) {
            console.log(`did not play this turn`, e)
        }
    }

    gettingReady(inspector: GameSnapshotInspector): void {

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
