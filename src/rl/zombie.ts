import {Mapper} from '../mapper';
import {Client} from '../client'
import {GameSnapshot, OrderSet} from "../pb/server_pb";

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
    10: {Col:9, Row: 1},
    11: {Col: 10, Row: 1},
}

export function newZombiePlayer(teamSide, playerNumber, gameServerAddress) {
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

        const turnHandler = (orderSet: OrderSet, snapshot: GameSnapshot) : Promise<OrderSet> => {
            return new Promise((r, j ) => {
                console.log(`Zombie got ${snapshot.getTurn()}`)
                orderSet.setDebugMessage(`${teamSide === 0 ? 'HOME' : 'AWAY'}-${playerNumber} #${snapshot.getTurn()}`)
                r(orderSet);
            });
        }
        lugoClient.play(turnHandler, resolve).catch(e => {
            console.log(`[PLay] Zombie player ${teamSide === 0 ? 'HOME' : 'AWAY'}-${playerNumber} said: ${e.toString()}`)
            reject();
        })
    })

}

