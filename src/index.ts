import { Client, NewClientFromConfig } from './client'
import { EnvVarLoader } from './configurator'
import GameSnapshotInspector from './game-snapshot-inspector'
import * as geo from "./geo"
import { NewVector, distanceBetweenPoints, getLength, getScaledVector, normalize, subVector } from "./geo"
import { Goal } from './goal'
import { Mapper, Region } from './mapper'
import * as ORIENTATION from './orentation'
import * as Lugo from './proto_exported'
import * as rl from "./rl/index"
import { SPECS } from "./specs.js"
import { Bot, PLAYER_STATE } from './stub'
import { NewDefaultStarter } from './starter'
// imports actually used in this file

export {
    Bot, Client, EnvVarLoader, GameSnapshotInspector, Goal, Lugo, Mapper, NewClientFromConfig, NewVector, ORIENTATION, PLAYER_STATE, Region, SPECS, distanceBetweenPoints, geo, getLength, getScaledVector, // keeping backward compatibility
    normalize, rl, subVector, NewDefaultStarter
}

export enum DIRECTION {
    FORWARD,
    BACKWARD,
    LEFT,
    RIGHT,
    BACKWARD_LEFT,
    BACKWARD_RIGHT,
    FORWARD_LEFT,
    FORWARD_RIGHT,
}


/**
 *
 * @param {GameSnapshotInspector}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
export function defineState(snapshot: GameSnapshotInspector, playerNumber: number, side: Lugo.Team.Side): PLAYER_STATE {
    if (!snapshot || !snapshot.getBall()) {
        throw new Error('invalid snapshot state - cannot define player state')
    }

    const me = snapshot.getPlayer(side, playerNumber)
    if (!me) {
        throw new Error('could not find the bot in the snapshot - cannot define player state')
    }

    const ballHolder = snapshot.getBall().getHolder()
    if (!ballHolder) {
        return PLAYER_STATE.DISPUTING_THE_BALL
    } else if (ballHolder.getTeamSide() === side) {
        if (ballHolder.getNumber() === playerNumber) {
            return PLAYER_STATE.HOLDING_THE_BALL
        }
        return PLAYER_STATE.SUPPORTING
    }
    return PLAYER_STATE.DEFENDING
}
