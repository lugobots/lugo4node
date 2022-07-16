
// exposing all from server
import {
    Ball,
    Catch,
    GameSnapshot,
    Jump,
    Kick,
    Move,
    Order,
    Player,
    Team,
    JoinRequest,
    OrderSet,
    ShotClock,
    OrderResponse,
} from "./pb/server_pb";
export {Ball, Catch, GameSnapshot, Jump, Kick, Move, Order, Player, Team, JoinRequest, OrderSet, ShotClock,OrderResponse}

// exposing all from broadcast
import {WatcherRequest,
    StartRequest,
    GameEvent,
    GameSetup,
    TeamSettings,
    TeamColors,
    TeamColor,
    EventNewPlayer,
    EventLostPlayer,
    EventStateChange,
    EventGoal,
    EventGameOver,
    EventDebugBreakpoint,
    EventDebugReleased,
} from './pb/broadcast_pb'
export {WatcherRequest,
    StartRequest,
    GameEvent,
    GameSetup,
    TeamSettings,
    TeamColors,
    TeamColor,
    EventNewPlayer,
    EventLostPlayer,
    EventStateChange,
    EventGoal,
    EventGameOver,
    EventDebugBreakpoint,
    EventDebugReleased,
}

// exposing all from remote
import {
    CommandResponse,
    GameProperties,
    PlayerProperties,
    BallProperties,
    NextOrderRequest,
    PauseResumeRequest,
    NextTurnRequest,
} from './pb/remote_pb'
export {
    CommandResponse,
    GameProperties,
    PlayerProperties,
    BallProperties,
    NextOrderRequest,
    PauseResumeRequest,
    NextTurnRequest,
}

import {BroadcastClient} from './pb/BroadcastServiceClientPb'
export {BroadcastClient}

import {RemoteClient} from './pb/RemoteServiceClientPb'
export {RemoteClient}

import {GameClient} from './pb/ServerServiceClientPb'
export {GameClient}
