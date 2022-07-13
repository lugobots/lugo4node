import * as jspb from 'google-protobuf'

import * as server_pb from './server_pb';


export class WatcherRequest extends jspb.Message {
  getUuid(): string;
  setUuid(value: string): WatcherRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WatcherRequest.AsObject;
  static toObject(includeInstance: boolean, msg: WatcherRequest): WatcherRequest.AsObject;
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
  getGameSnapshot(): server_pb.GameSnapshot | undefined;
  setGameSnapshot(value?: server_pb.GameSnapshot): GameEvent;
  hasGameSnapshot(): boolean;
  clearGameSnapshot(): GameEvent;

  getNewPlayer(): EventNewPlayer | undefined;
  setNewPlayer(value?: EventNewPlayer): GameEvent;
  hasNewPlayer(): boolean;
  clearNewPlayer(): GameEvent;

  getLostPlayer(): EventLostPlayer | undefined;
  setLostPlayer(value?: EventLostPlayer): GameEvent;
  hasLostPlayer(): boolean;
  clearLostPlayer(): GameEvent;

  getStateChange(): EventStateChange | undefined;
  setStateChange(value?: EventStateChange): GameEvent;
  hasStateChange(): boolean;
  clearStateChange(): GameEvent;

  getGoal(): EventGoal | undefined;
  setGoal(value?: EventGoal): GameEvent;
  hasGoal(): boolean;
  clearGoal(): GameEvent;

  getGameOver(): EventGameOver | undefined;
  setGameOver(value?: EventGameOver): GameEvent;
  hasGameOver(): boolean;
  clearGameOver(): GameEvent;

  getBreakpoint(): EventDebugBreakpoint | undefined;
  setBreakpoint(value?: EventDebugBreakpoint): GameEvent;
  hasBreakpoint(): boolean;
  clearBreakpoint(): GameEvent;

  getDebugReleased(): EventDebugReleased | undefined;
  setDebugReleased(value?: EventDebugReleased): GameEvent;
  hasDebugReleased(): boolean;
  clearDebugReleased(): GameEvent;

  getEventCase(): GameEvent.EventCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameEvent.AsObject;
  static toObject(includeInstance: boolean, msg: GameEvent): GameEvent.AsObject;
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

  getHomeTeam(): TeamSettings | undefined;
  setHomeTeam(value?: TeamSettings): GameSetup;
  hasHomeTeam(): boolean;
  clearHomeTeam(): GameSetup;

  getAwayTeam(): TeamSettings | undefined;
  setAwayTeam(value?: TeamSettings): GameSetup;
  hasAwayTeam(): boolean;
  clearAwayTeam(): GameSetup;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameSetup.AsObject;
  static toObject(includeInstance: boolean, msg: GameSetup): GameSetup.AsObject;
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

  getColors(): TeamColors | undefined;
  setColors(value?: TeamColors): TeamSettings;
  hasColors(): boolean;
  clearColors(): TeamSettings;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TeamSettings.AsObject;
  static toObject(includeInstance: boolean, msg: TeamSettings): TeamSettings.AsObject;
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
  getPrimary(): TeamColor | undefined;
  setPrimary(value?: TeamColor): TeamColors;
  hasPrimary(): boolean;
  clearPrimary(): TeamColors;

  getSecondary(): TeamColor | undefined;
  setSecondary(value?: TeamColor): TeamColors;
  hasSecondary(): boolean;
  clearSecondary(): TeamColors;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): TeamColors.AsObject;
  static toObject(includeInstance: boolean, msg: TeamColors): TeamColors.AsObject;
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
  getPlayer(): server_pb.Player | undefined;
  setPlayer(value?: server_pb.Player): EventNewPlayer;
  hasPlayer(): boolean;
  clearPlayer(): EventNewPlayer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventNewPlayer.AsObject;
  static toObject(includeInstance: boolean, msg: EventNewPlayer): EventNewPlayer.AsObject;
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
  getPlayer(): server_pb.Player | undefined;
  setPlayer(value?: server_pb.Player): EventLostPlayer;
  hasPlayer(): boolean;
  clearPlayer(): EventLostPlayer;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventLostPlayer.AsObject;
  static toObject(includeInstance: boolean, msg: EventLostPlayer): EventLostPlayer.AsObject;
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
  static serializeBinaryToWriter(message: EventGoal, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventGoal;
  static deserializeBinaryFromReader(message: EventGoal, reader: jspb.BinaryReader): EventGoal;
}

export namespace EventGoal {
  export type AsObject = {
    side: server_pb.Team.Side,
  }
}

export class EventGameOver extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventGameOver.AsObject;
  static toObject(includeInstance: boolean, msg: EventGameOver): EventGameOver.AsObject;
  static serializeBinaryToWriter(message: EventGameOver, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventGameOver;
  static deserializeBinaryFromReader(message: EventGameOver, reader: jspb.BinaryReader): EventGameOver;
}

export namespace EventGameOver {
  export type AsObject = {
  }
}

export class EventDebugBreakpoint extends jspb.Message {
  getBreakpoint(): EventDebugBreakpoint.Breakpoint;
  setBreakpoint(value: EventDebugBreakpoint.Breakpoint): EventDebugBreakpoint;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): EventDebugBreakpoint.AsObject;
  static toObject(includeInstance: boolean, msg: EventDebugBreakpoint): EventDebugBreakpoint.AsObject;
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
  static serializeBinaryToWriter(message: EventDebugReleased, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): EventDebugReleased;
  static deserializeBinaryFromReader(message: EventDebugReleased, reader: jspb.BinaryReader): EventDebugReleased;
}

export namespace EventDebugReleased {
  export type AsObject = {
  }
}

