import { Client, NewClientFromConfig } from './client';
import { EnvVarLoader } from './configurator';
import GameSnapshotInspector from './game-snapshot-inspector';
import * as geo from "./geo";
import { NewVector, distanceBetweenPoints, getLength, getScaledVector, normalize, subVector } from "./geo";
import { Goal } from './goal';
import { Mapper, Region } from './mapper';
import * as ORIENTATION from './orentation';
import * as Lugo from './proto_exported';
import * as rl from "./rl/index";
import { SPECS } from "./specs.js";
import { Bot, PLAYER_STATE } from './stub';
export { Bot, Client, EnvVarLoader, GameSnapshotInspector, Goal, Lugo, Mapper, NewClientFromConfig, NewVector, ORIENTATION, PLAYER_STATE, Region, SPECS, distanceBetweenPoints, geo, getLength, getScaledVector, // keeping backward compatibility
normalize, rl, subVector };
export declare enum DIRECTION {
    FORWARD = 0,
    BACKWARD = 1,
    LEFT = 2,
    RIGHT = 3,
    BACKWARD_LEFT = 4,
    BACKWARD_RIGHT = 5,
    FORWARD_LEFT = 6,
    FORWARD_RIGHT = 7
}
/**
 *
 * @param {GameSnapshotInspector}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
export declare function defineState(snapshot: GameSnapshotInspector, playerNumber: number, side: Lugo.Team.Side): PLAYER_STATE;
