// package: lugo
// file: broadcast.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as server_pb from "./server_pb";

export class WatcherRequest extends jspb.Message { 
    getUuid(): string;
    setUuid(value: string): WatcherRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): WatcherRequest.AsObject;
    static toObject(includeInstance: boolean, msg: WatcherRequest): WatcherRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: WatcherRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): WatcherRequest;
    static deserializeBinaryFromReader(message: WatcherRequest, reader: jspb.BinaryReader): WatcherRequest;
}

export namespace WatcherRequest {
    export type AsObject = {
        uuid: string,
    }
}

export class StartRequest extends jspb.Message { 
    getWatcherUuid(): string;
    setWatcherUuid(value: string): StartRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): StartRequest.AsObject;
    static toObject(includeInstance: boolean, msg: StartRequest): StartRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: StartRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): StartRequest;
    static deserializeBinaryFromReader(message: StartRequest, reader: jspb.BinaryReader): StartRequest;
}

export namespace StartRequest {
    export type AsObject = {
        watcherUuid: string,
    }
}

export class GameEvent extends jspb.Message { 

    hasGameSnapshot(): boolean;
    clearGameSnapshot(): void;
    getGameSnapshot(): server_pb.GameSnapshot | undefined;
    setGameSnapshot(value?: server_pb.GameSnapshot): GameEvent;

    hasNewPlayer(): boolean;
    clearNewPlayer(): void;
    getNewPlayer(): EventNewPlayer | undefined;
    setNewPlayer(value?: EventNewPlayer): GameEvent;

    hasLostPlayer(): boolean;
    clearLostPlayer(): void;
    getLostPlayer(): EventLostPlayer | undefined;
    setLostPlayer(value?: EventLostPlayer): GameEvent;

    hasStateChange(): boolean;
    clearStateChange(): void;
    getStateChange(): EventStateChange | undefined;
    setStateChange(value?: EventStateChange): GameEvent;

    hasGoal(): boolean;
    clearGoal(): void;
    getGoal(): EventGoal | undefined;
    setGoal(value?: EventGoal): GameEvent;

    hasGameOver(): boolean;
    clearGameOver(): void;
    getGameOver(): EventGameOver | undefined;
    setGameOver(value?: EventGameOver): GameEvent;

    hasBreakpoint(): boolean;
    clearBreakpoint(): void;
    getBreakpoint(): EventDebugBreakpoint | undefined;
    setBreakpoint(value?: EventDebugBreakpoint): GameEvent;

    hasDebugReleased(): boolean;
    clearDebugReleased(): void;
    getDebugReleased(): EventDebugReleased | undefined;
    setDebugReleased(value?: EventDebugReleased): GameEvent;

    hasPeriodChanged(): boolean;
    clearPeriodChanged(): void;
    getPeriodChanged(): EventPeriodChanged | undefined;
    setPeriodChanged(value?: EventPeriodChanged): GameEvent;

    getEventCase(): GameEvent.EventCase;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameEvent.AsObject;
    static toObject(includeInstance: boolean, msg: GameEvent): GameEvent.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameEvent, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameEvent;
    static deserializeBinaryFromReader(message: GameEvent, reader: jspb.BinaryReader): GameEvent;
}

export namespace GameEvent {
    export type AsObject = {
        gameSnapshot?: server_pb.GameSnapshot.AsObject,
        newPlayer?: EventNewPlayer.AsObject,
        lostPlayer?: EventLostPlayer.AsObject,
        stateChange?: EventStateChange.AsObject,
        goal?: EventGoal.AsObject,
        gameOver?: EventGameOver.AsObject,
        breakpoint?: EventDebugBreakpoint.AsObject,
        debugReleased?: EventDebugReleased.AsObject,
        periodChanged?: EventPeriodChanged.AsObject,
    }

    export enum EventCase {
        EVENT_NOT_SET = 0,
        NEW_PLAYER = 2,
        LOST_PLAYER = 3,
        STATE_CHANGE = 4,
        GOAL = 5,
        GAME_OVER = 6,
        BREAKPOINT = 7,
        DEBUG_RELEASED = 8,
        PERIOD_CHANGED = 9,
    }

}

export class GameSetup extends jspb.Message { 
    getProtocolVersion(): string;
    setProtocolVersion(value: string): GameSetup;
    getDevMode(): boolean;
    setDevMode(value: boolean): GameSetup;
    getStartMode(): GameSetup.StartingMode;
    setStartMode(value: GameSetup.StartingMode): GameSetup;
    getListeningMode(): GameSetup.ListeningMode;
    setListeningMode(value: GameSetup.ListeningMode): GameSetup;
    getListeningDuration(): number;
    setListeningDuration(value: number): GameSetup;
    getGameDuration(): number;
    setGameDuration(value: number): GameSetup;

    hasHomeTeam(): boolean;
    clearHomeTeam(): void;
    getHomeTeam(): TeamSettings | undefined;
    setHomeTeam(value?: TeamSettings): GameSetup;

    hasAwayTeam(): boolean;
    clearAwayTeam(): void;
    getAwayTeam(): TeamSettings | undefined;
    setAwayTeam(value?: TeamSettings): GameSetup;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameSetup.AsObject;
    static toObject(includeInstance: boolean, msg: GameSetup): GameSetup.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameSetup, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameSetup;
    static deserializeBinaryFromReader(message: GameSetup, reader: jspb.BinaryReader): GameSetup;
}

export namespace GameSetup {
    export type AsObject = {
        protocolVersion: string,
        devMode: boolean,
        startMode: GameSetup.StartingMode,
        listeningMode: GameSetup.ListeningMode,
        listeningDuration: number,
        gameDuration: number,
        homeTeam?: TeamSettings.AsObject,
        awayTeam?: TeamSettings.AsObject,
    }

    export enum StartingMode {
    NO_WAIT = 0,
    WAIT = 1,
    }

    export enum ListeningMode {
    TIMER = 0,
    RUSH = 1,
    REMOTE = 2,
    }

}

export class TeamSettings extends jspb.Message { 
    getName(): string;
    setName(value: string): TeamSettings;
    getAvatar(): string;
    setAvatar(value: string): TeamSettings;

    hasColors(): boolean;
    clearColors(): void;
    getColors(): TeamColors | undefined;
    setColors(value?: TeamColors): TeamSettings;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TeamSettings.AsObject;
    static toObject(includeInstance: boolean, msg: TeamSettings): TeamSettings.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TeamSettings, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TeamSettings;
    static deserializeBinaryFromReader(message: TeamSettings, reader: jspb.BinaryReader): TeamSettings;
}

export namespace TeamSettings {
    export type AsObject = {
        name: string,
        avatar: string,
        colors?: TeamColors.AsObject,
    }
}

export class TeamColors extends jspb.Message { 

    hasPrimary(): boolean;
    clearPrimary(): void;
    getPrimary(): TeamColor | undefined;
    setPrimary(value?: TeamColor): TeamColors;

    hasSecondary(): boolean;
    clearSecondary(): void;
    getSecondary(): TeamColor | undefined;
    setSecondary(value?: TeamColor): TeamColors;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TeamColors.AsObject;
    static toObject(includeInstance: boolean, msg: TeamColors): TeamColors.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TeamColors, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TeamColors;
    static deserializeBinaryFromReader(message: TeamColors, reader: jspb.BinaryReader): TeamColors;
}

export namespace TeamColors {
    export type AsObject = {
        primary?: TeamColor.AsObject,
        secondary?: TeamColor.AsObject,
    }
}

export class TeamColor extends jspb.Message { 
    getRed(): number;
    setRed(value: number): TeamColor;
    getGreen(): number;
    setGreen(value: number): TeamColor;
    getBlue(): number;
    setBlue(value: number): TeamColor;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TeamColor.AsObject;
    static toObject(includeInstance: boolean, msg: TeamColor): TeamColor.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TeamColor, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TeamColor;
    static deserializeBinaryFromReader(message: TeamColor, reader: jspb.BinaryReader): TeamColor;
}

export namespace TeamColor {
    export type AsObject = {
        red: number,
        green: number,
        blue: number,
    }
}

export class EventNewPlayer extends jspb.Message { 

    hasPlayer(): boolean;
    clearPlayer(): void;
    getPlayer(): server_pb.Player | undefined;
    setPlayer(value?: server_pb.Player): EventNewPlayer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventNewPlayer.AsObject;
    static toObject(includeInstance: boolean, msg: EventNewPlayer): EventNewPlayer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventNewPlayer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventNewPlayer;
    static deserializeBinaryFromReader(message: EventNewPlayer, reader: jspb.BinaryReader): EventNewPlayer;
}

export namespace EventNewPlayer {
    export type AsObject = {
        player?: server_pb.Player.AsObject,
    }
}

export class EventLostPlayer extends jspb.Message { 

    hasPlayer(): boolean;
    clearPlayer(): void;
    getPlayer(): server_pb.Player | undefined;
    setPlayer(value?: server_pb.Player): EventLostPlayer;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventLostPlayer.AsObject;
    static toObject(includeInstance: boolean, msg: EventLostPlayer): EventLostPlayer.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventLostPlayer, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventLostPlayer;
    static deserializeBinaryFromReader(message: EventLostPlayer, reader: jspb.BinaryReader): EventLostPlayer;
}

export namespace EventLostPlayer {
    export type AsObject = {
        player?: server_pb.Player.AsObject,
    }
}

export class EventStateChange extends jspb.Message { 
    getPreviousState(): server_pb.GameSnapshot.State;
    setPreviousState(value: server_pb.GameSnapshot.State): EventStateChange;
    getNewState(): server_pb.GameSnapshot.State;
    setNewState(value: server_pb.GameSnapshot.State): EventStateChange;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventStateChange.AsObject;
    static toObject(includeInstance: boolean, msg: EventStateChange): EventStateChange.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventStateChange, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventStateChange;
    static deserializeBinaryFromReader(message: EventStateChange, reader: jspb.BinaryReader): EventStateChange;
}

export namespace EventStateChange {
    export type AsObject = {
        previousState: server_pb.GameSnapshot.State,
        newState: server_pb.GameSnapshot.State,
    }
}

export class EventGoal extends jspb.Message { 
    getSide(): server_pb.Team.Side;
    setSide(value: server_pb.Team.Side): EventGoal;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventGoal.AsObject;
    static toObject(includeInstance: boolean, msg: EventGoal): EventGoal.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventGoal, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventGoal;
    static deserializeBinaryFromReader(message: EventGoal, reader: jspb.BinaryReader): EventGoal;
}

export namespace EventGoal {
    export type AsObject = {
        side: server_pb.Team.Side,
    }
}

export class EventPeriodChanged extends jspb.Message { 
    getPeriod(): server_pb.GameSnapshot.Period;
    setPeriod(value: server_pb.GameSnapshot.Period): EventPeriodChanged;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventPeriodChanged.AsObject;
    static toObject(includeInstance: boolean, msg: EventPeriodChanged): EventPeriodChanged.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventPeriodChanged, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventPeriodChanged;
    static deserializeBinaryFromReader(message: EventPeriodChanged, reader: jspb.BinaryReader): EventPeriodChanged;
}

export namespace EventPeriodChanged {
    export type AsObject = {
        period: server_pb.GameSnapshot.Period,
    }
}

export class EventGameOver extends jspb.Message { 
    getReason(): EventGameOver.EndingReason;
    setReason(value: EventGameOver.EndingReason): EventGameOver;
    getBlame(): EventGameOver.BlameStop;
    setBlame(value: EventGameOver.BlameStop): EventGameOver;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventGameOver.AsObject;
    static toObject(includeInstance: boolean, msg: EventGameOver): EventGameOver.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventGameOver, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventGameOver;
    static deserializeBinaryFromReader(message: EventGameOver, reader: jspb.BinaryReader): EventGameOver;
}

export namespace EventGameOver {
    export type AsObject = {
        reason: EventGameOver.EndingReason,
        blame: EventGameOver.BlameStop,
    }

    export enum EndingReason {
    TIME_IS_OVER = 0,
    WAITING_EXPIRED = 1,
    NO_ENOUGH_PLAYER = 2,
    EXTERNAL_REQUEST = 3,
    KNOCKOUT = 4,
    GOLDEN_GOL = 5,
    EXTRA_TIME_IS_OVER = 6,
    }

    export enum BlameStop {
    NORMAL = 0,
    BOTH_TEAMS = 1,
    HOME_TEAM = 2,
    AWAY_TEAM = 3,
    }

}

export class EventDebugBreakpoint extends jspb.Message { 
    getBreakpoint(): EventDebugBreakpoint.Breakpoint;
    setBreakpoint(value: EventDebugBreakpoint.Breakpoint): EventDebugBreakpoint;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventDebugBreakpoint.AsObject;
    static toObject(includeInstance: boolean, msg: EventDebugBreakpoint): EventDebugBreakpoint.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventDebugBreakpoint, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventDebugBreakpoint;
    static deserializeBinaryFromReader(message: EventDebugBreakpoint, reader: jspb.BinaryReader): EventDebugBreakpoint;
}

export namespace EventDebugBreakpoint {
    export type AsObject = {
        breakpoint: EventDebugBreakpoint.Breakpoint,
    }

    export enum Breakpoint {
    ORDERS = 0,
    TURN = 1,
    }

}

export class EventDebugReleased extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): EventDebugReleased.AsObject;
    static toObject(includeInstance: boolean, msg: EventDebugReleased): EventDebugReleased.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: EventDebugReleased, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): EventDebugReleased;
    static deserializeBinaryFromReader(message: EventDebugReleased, reader: jspb.BinaryReader): EventDebugReleased;
}

export namespace EventDebugReleased {
    export type AsObject = {
    }
}
