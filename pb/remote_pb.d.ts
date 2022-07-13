import * as jspb from 'google-protobuf'

import * as physics_pb from './physics_pb';
import * as server_pb from './server_pb';


export class PauseResumeRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PauseResumeRequest.AsObject;
  static toObject(includeInstance: boolean, msg: PauseResumeRequest): PauseResumeRequest.AsObject;
  static serializeBinaryToWriter(message: PauseResumeRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PauseResumeRequest;
  static deserializeBinaryFromReader(message: PauseResumeRequest, reader: jspb.BinaryReader): PauseResumeRequest;
}

export namespace PauseResumeRequest {
  export type AsObject = {
  }
}

export class NextTurnRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextTurnRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NextTurnRequest): NextTurnRequest.AsObject;
  static serializeBinaryToWriter(message: NextTurnRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextTurnRequest;
  static deserializeBinaryFromReader(message: NextTurnRequest, reader: jspb.BinaryReader): NextTurnRequest;
}

export namespace NextTurnRequest {
  export type AsObject = {
  }
}

export class NextOrderRequest extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): NextOrderRequest.AsObject;
  static toObject(includeInstance: boolean, msg: NextOrderRequest): NextOrderRequest.AsObject;
  static serializeBinaryToWriter(message: NextOrderRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): NextOrderRequest;
  static deserializeBinaryFromReader(message: NextOrderRequest, reader: jspb.BinaryReader): NextOrderRequest;
}

export namespace NextOrderRequest {
  export type AsObject = {
  }
}

export class BallProperties extends jspb.Message {
  getPosition(): physics_pb.Point | undefined;
  setPosition(value?: physics_pb.Point): BallProperties;
  hasPosition(): boolean;
  clearPosition(): BallProperties;

  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): BallProperties;
  hasVelocity(): boolean;
  clearVelocity(): BallProperties;

  getHolder(): server_pb.Player | undefined;
  setHolder(value?: server_pb.Player): BallProperties;
  hasHolder(): boolean;
  clearHolder(): BallProperties;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): BallProperties.AsObject;
  static toObject(includeInstance: boolean, msg: BallProperties): BallProperties.AsObject;
  static serializeBinaryToWriter(message: BallProperties, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): BallProperties;
  static deserializeBinaryFromReader(message: BallProperties, reader: jspb.BinaryReader): BallProperties;
}

export namespace BallProperties {
  export type AsObject = {
    position?: physics_pb.Point.AsObject,
    velocity?: physics_pb.Velocity.AsObject,
    holder?: server_pb.Player.AsObject,
  }
}

export class PlayerProperties extends jspb.Message {
  getSide(): server_pb.Team.Side;
  setSide(value: server_pb.Team.Side): PlayerProperties;

  getNumber(): number;
  setNumber(value: number): PlayerProperties;

  getPosition(): physics_pb.Point | undefined;
  setPosition(value?: physics_pb.Point): PlayerProperties;
  hasPosition(): boolean;
  clearPosition(): PlayerProperties;

  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): PlayerProperties;
  hasVelocity(): boolean;
  clearVelocity(): PlayerProperties;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PlayerProperties.AsObject;
  static toObject(includeInstance: boolean, msg: PlayerProperties): PlayerProperties.AsObject;
  static serializeBinaryToWriter(message: PlayerProperties, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PlayerProperties;
  static deserializeBinaryFromReader(message: PlayerProperties, reader: jspb.BinaryReader): PlayerProperties;
}

export namespace PlayerProperties {
  export type AsObject = {
    side: server_pb.Team.Side,
    number: number,
    position?: physics_pb.Point.AsObject,
    velocity?: physics_pb.Velocity.AsObject,
  }
}

export class GameProperties extends jspb.Message {
  getTurn(): number;
  setTurn(value: number): GameProperties;

  getHomeScore(): number;
  setHomeScore(value: number): GameProperties;

  getAwayScore(): number;
  setAwayScore(value: number): GameProperties;

  getFrameInterval(): number;
  setFrameInterval(value: number): GameProperties;

  getShotClock(): server_pb.ShotClock | undefined;
  setShotClock(value?: server_pb.ShotClock): GameProperties;
  hasShotClock(): boolean;
  clearShotClock(): GameProperties;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameProperties.AsObject;
  static toObject(includeInstance: boolean, msg: GameProperties): GameProperties.AsObject;
  static serializeBinaryToWriter(message: GameProperties, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameProperties;
  static deserializeBinaryFromReader(message: GameProperties, reader: jspb.BinaryReader): GameProperties;
}

export namespace GameProperties {
  export type AsObject = {
    turn: number,
    homeScore: number,
    awayScore: number,
    frameInterval: number,
    shotClock?: server_pb.ShotClock.AsObject,
  }
}

export class CommandResponse extends jspb.Message {
  getCode(): CommandResponse.StatusCode;
  setCode(value: CommandResponse.StatusCode): CommandResponse;

  getGameSnapshot(): server_pb.GameSnapshot | undefined;
  setGameSnapshot(value?: server_pb.GameSnapshot): CommandResponse;
  hasGameSnapshot(): boolean;
  clearGameSnapshot(): CommandResponse;

  getDetails(): string;
  setDetails(value: string): CommandResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): CommandResponse.AsObject;
  static toObject(includeInstance: boolean, msg: CommandResponse): CommandResponse.AsObject;
  static serializeBinaryToWriter(message: CommandResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): CommandResponse;
  static deserializeBinaryFromReader(message: CommandResponse, reader: jspb.BinaryReader): CommandResponse;
}

export namespace CommandResponse {
  export type AsObject = {
    code: CommandResponse.StatusCode,
    gameSnapshot?: server_pb.GameSnapshot.AsObject,
    details: string,
  }

  export enum StatusCode { 
    SUCCESS = 0,
    INVALID_VALUE = 1,
    DEADLINE_EXCEEDED = 2,
    OTHER = 99,
  }
}

