import {Mapper} from '../mapper';
import {Client, RawTurnProcessor} from '../client'
import {GameSnapshot, OrderSet} from "../pb/server_pb";
import {DIRECTION, GameSnapshotReader} from "../index";

const PLAYER_POSITIONS = {
    1: {Col: 0, Row: 1},
    2: {Col: 1, Row: 1},
    3: {Col: 2, Row: 1},
    4: {Col: 3, Row: 1},
    5: {Col: 4, Row: 1},
    6: {Col: 5, Row: 1},
    7: {Col: 6, Row: 1},
    8: {Col: 7, Row: 1},
    9: {Col: 8, Row: 1},
    10: {Col: 9, Row: 1},
    11: {Col: 10, Row: 1},
}

// const possibleAction = ;

export function newRandomMotionHelperPlayer(teamSide, playerNumber, gameServerAddress, turnsToChangeDirection = 60) {
    let changeCounter = 0
    let currentDir;
    return newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, async (orderSet: OrderSet, snapshot: GameSnapshot): Promise<OrderSet> => {
        changeCounter--;
        if (changeCounter <= 0) {
            console.log("change dir!", teamSide, playerNumber, snapshot.getTurn())
            changeCounter = turnsToChangeDirection
            currentDir = [
                DIRECTION.FORWARD,
                DIRECTION.BACKWARD,
                DIRECTION.LEFT,
                DIRECTION.RIGHT,
                DIRECTION.BACKWARD_LEFT,
                DIRECTION.BACKWARD_RIGHT,
                DIRECTION.FORWARD_RIGHT,
                DIRECTION.FORWARD_LEFT,
            ][Math.floor(Math.random() * 8)]
        }
        const reader = new GameSnapshotReader(snapshot, teamSide)
        orderSet.addOrders(reader.makeOrderMoveByDirection(currentDir))
        orderSet.setDebugMessage(`${teamSide === 0 ? 'HOME' : 'AWAY'}-${playerNumber} #${snapshot.getTurn()} - chasing ball`)
        return orderSet;
    })
}

export function newChaserHelperPlayer(teamSide, playerNumber, gameServerAddress) {
    return newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, async (orderSet: OrderSet, snapshot: GameSnapshot): Promise<OrderSet> => {
        const reader = new GameSnapshotReader(snapshot, teamSide)
        orderSet.addOrders(reader.makeOrderCatch())
        const me = reader.getPlayer(teamSide, playerNumber)
        if (!me) {
            throw new Error("did not find myself in the game")
        }

        orderSet.addOrders(reader.makeOrderMoveMaxSpeed(me.getPosition(), snapshot.getBall().getPosition()))
        orderSet.setDebugMessage(`${teamSide === 0 ? 'HOME' : 'AWAY'}-${playerNumber} #${snapshot.getTurn()} - chasing ball`)
        return orderSet;
    })
}

export function newZombieHelperPlayer(teamSide, playerNumber, gameServerAddress): Promise<void> {
    return newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, async (orderSet: OrderSet, snapshot: GameSnapshot): Promise<OrderSet> => {
        orderSet.setDebugMessage(`${teamSide === 0 ? 'HOME' : 'AWAY'}-${playerNumber} #${snapshot.getTurn()}`)
        return orderSet;
    })
}

export function newCustomHelperPlayer(teamSide, playerNumber, gameServerAddress, turnHandler: RawTurnProcessor): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        const map = new Mapper(22, 5, teamSide)
        const initialRegion = map.getRegion(PLAYER_POSITIONS[playerNumber].Col, PLAYER_POSITIONS[playerNumber].Row)
        const lugoClient = new Client(
            gameServerAddress,
            true,
            "",
            teamSide,
            playerNumber
            , initialRegion.getCenter())
        lugoClient.play(turnHandler, resolve).catch(e => {
            reject();
        })
    })

}
