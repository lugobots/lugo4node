
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
} from './pb/server_pb.js'
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
} from './pb/broadcast_pb.js'
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
} from './pb/remote_pb.js'
export {
    CommandResponse,
    GameProperties,
    PlayerProperties,
    BallProperties,
    NextOrderRequest,
    PauseResumeRequest,
    NextTurnRequest,
}

import {BroadcastClient} from './pb/BroadcastServiceClientPb.js'
export {BroadcastClient}

import {RemoteClient} from './pb/RemoteServiceClientPb.js'
export {RemoteClient}

import {GameClient} from './pb/ServerServiceClientPb.js'
export {GameClient}
