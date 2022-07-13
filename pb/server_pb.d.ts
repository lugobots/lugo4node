import * as jspb from 'google-protobuf'

import * as physics_pb from './physics_pb';


export class JoinRequest extends jspb.Message {
  getToken(): string;
  setToken(value: string): JoinRequest;

  getProtocolVersion(): string;
  setProtocolVersion(value: string): JoinRequest;

  getTeamSide(): Team.Side;
  setTeamSide(value: Team.Side): JoinRequest;

  getNumber(): number;
  setNumber(value: number): JoinRequest;

  getInitPosition(): physics_pb.Point | undefined;
  setInitPosition(value?: physics_pb.Point): JoinRequest;
  hasInitPosition(): boolean;
  clearInitPosition(): JoinRequest;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): JoinRequest.AsObject;
  static toObject(includeInstance: boolean, msg: JoinRequest): JoinRequest.AsObject;
  static serializeBinaryToWriter(message: JoinRequest, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): JoinRequest;
  static deserializeBinaryFromReader(message: JoinRequest, reader: jspb.BinaryReader): JoinRequest;
}

export namespace JoinRequest {
  export type AsObject = {
    token: string,
    protocolVersion: string,
    teamSide: Team.Side,
    number: number,
    initPosition?: physics_pb.Point.AsObject,
  }
}

export class GameSnapshot extends jspb.Message {
  getState(): GameSnapshot.State;
  setState(value: GameSnapshot.State): GameSnapshot;

  getTurn(): number;
  setTurn(value: number): GameSnapshot;

  getHomeTeam(): Team | undefined;
  setHomeTeam(value?: Team): GameSnapshot;
  hasHomeTeam(): boolean;
  clearHomeTeam(): GameSnapshot;

  getAwayTeam(): Team | undefined;
  setAwayTeam(value?: Team): GameSnapshot;
  hasAwayTeam(): boolean;
  clearAwayTeam(): GameSnapshot;

  getBall(): Ball | undefined;
  setBall(value?: Ball): GameSnapshot;
  hasBall(): boolean;
  clearBall(): GameSnapshot;

  getTurnsBallInGoalZone(): number;
  setTurnsBallInGoalZone(value: number): GameSnapshot;

  getShotClock(): ShotClock | undefined;
  setShotClock(value?: ShotClock): GameSnapshot;
  hasShotClock(): boolean;
  clearShotClock(): GameSnapshot;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GameSnapshot.AsObject;
  static toObject(includeInstance: boolean, msg: GameSnapshot): GameSnapshot.AsObject;
  static serializeBinaryToWriter(message: GameSnapshot, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GameSnapshot;
  static deserializeBinaryFromReader(message: GameSnapshot, reader: jspb.BinaryReader): GameSnapshot;
}

export namespace GameSnapshot {
  export type AsObject = {
    state: GameSnapshot.State,
    turn: number,
    homeTeam?: Team.AsObject,
    awayTeam?: Team.AsObject,
    ball?: Ball.AsObject,
    turnsBallInGoalZone: number,
    shotClock?: ShotClock.AsObject,
  }

  export enum State { 
    WAITING = 0,
    GET_READY = 1,
    LISTENING = 2,
    PLAYING = 3,
    SHIFTING = 4,
    OVER = 99,
  }
}

export class Team extends jspb.Message {
  getPlayersList(): Array<Player>;
  setPlayersList(value: Array<Player>): Team;
  clearPlayersList(): Team;
  addPlayers(value?: Player, index?: number): Player;

  getName(): string;
  setName(value: string): Team;

  getScore(): number;
  setScore(value: number): Team;

  getSide(): Team.Side;
  setSide(value: Team.Side): Team;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Team.AsObject;
  static toObject(includeInstance: boolean, msg: Team): Team.AsObject;
  static serializeBinaryToWriter(message: Team, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Team;
  static deserializeBinaryFromReader(message: Team, reader: jspb.BinaryReader): Team;
}

export namespace Team {
  export type AsObject = {
    playersList: Array<Player.AsObject>,
    name: string,
    score: number,
    side: Team.Side,
  }

  export enum Side { 
    HOME = 0,
    AWAY = 1,
  }
}

export class ShotClock extends jspb.Message {
  getTeamSide(): Team.Side;
  setTeamSide(value: Team.Side): ShotClock;

  getRemainingTurns(): number;
  setRemainingTurns(value: number): ShotClock;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ShotClock.AsObject;
  static toObject(includeInstance: boolean, msg: ShotClock): ShotClock.AsObject;
  static serializeBinaryToWriter(message: ShotClock, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ShotClock;
  static deserializeBinaryFromReader(message: ShotClock, reader: jspb.BinaryReader): ShotClock;
}

export namespace ShotClock {
  export type AsObject = {
    teamSide: Team.Side,
    remainingTurns: number,
  }
}

export class Player extends jspb.Message {
  getNumber(): number;
  setNumber(value: number): Player;

  getPosition(): physics_pb.Point | undefined;
  setPosition(value?: physics_pb.Point): Player;
  hasPosition(): boolean;
  clearPosition(): Player;

  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): Player;
  hasVelocity(): boolean;
  clearVelocity(): Player;

  getTeamSide(): Team.Side;
  setTeamSide(value: Team.Side): Player;

  getInitPosition(): physics_pb.Point | undefined;
  setInitPosition(value?: physics_pb.Point): Player;
  hasInitPosition(): boolean;
  clearInitPosition(): Player;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Player.AsObject;
  static toObject(includeInstance: boolean, msg: Player): Player.AsObject;
  static serializeBinaryToWriter(message: Player, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Player;
  static deserializeBinaryFromReader(message: Player, reader: jspb.BinaryReader): Player;
}

export namespace Player {
  export type AsObject = {
    number: number,
    position?: physics_pb.Point.AsObject,
    velocity?: physics_pb.Velocity.AsObject,
    teamSide: Team.Side,
    initPosition?: physics_pb.Point.AsObject,
  }
}

export class Ball extends jspb.Message {
  getPosition(): physics_pb.Point | undefined;
  setPosition(value?: physics_pb.Point): Ball;
  hasPosition(): boolean;
  clearPosition(): Ball;

  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): Ball;
  hasVelocity(): boolean;
  clearVelocity(): Ball;

  getHolder(): Player | undefined;
  setHolder(value?: Player): Ball;
  hasHolder(): boolean;
  clearHolder(): Ball;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Ball.AsObject;
  static toObject(includeInstance: boolean, msg: Ball): Ball.AsObject;
  static serializeBinaryToWriter(message: Ball, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Ball;
  static deserializeBinaryFromReader(message: Ball, reader: jspb.BinaryReader): Ball;
}

export namespace Ball {
  export type AsObject = {
    position?: physics_pb.Point.AsObject,
    velocity?: physics_pb.Velocity.AsObject,
    holder?: Player.AsObject,
  }
}

export class OrderResponse extends jspb.Message {
  getCode(): OrderResponse.StatusCode;
  setCode(value: OrderResponse.StatusCode): OrderResponse;

  getDetails(): string;
  setDetails(value: string): OrderResponse;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderResponse.AsObject;
  static toObject(includeInstance: boolean, msg: OrderResponse): OrderResponse.AsObject;
  static serializeBinaryToWriter(message: OrderResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderResponse;
  static deserializeBinaryFromReader(message: OrderResponse, reader: jspb.BinaryReader): OrderResponse;
}

export namespace OrderResponse {
  export type AsObject = {
    code: OrderResponse.StatusCode,
    details: string,
  }

  export enum StatusCode { 
    SUCCESS = 0,
    UNKNOWN_PLAYER = 1,
    NOT_LISTENING = 2,
    WRONG_TURN = 3,
    OTHER = 99,
  }
}

export class OrderSet extends jspb.Message {
  getTurn(): number;
  setTurn(value: number): OrderSet;

  getOrdersList(): Array<Order>;
  setOrdersList(value: Array<Order>): OrderSet;
  clearOrdersList(): OrderSet;
  addOrders(value?: Order, index?: number): Order;

  getDebugMessage(): string;
  setDebugMessage(value: string): OrderSet;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): OrderSet.AsObject;
  static toObject(includeInstance: boolean, msg: OrderSet): OrderSet.AsObject;
  static serializeBinaryToWriter(message: OrderSet, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): OrderSet;
  static deserializeBinaryFromReader(message: OrderSet, reader: jspb.BinaryReader): OrderSet;
}

export namespace OrderSet {
  export type AsObject = {
    turn: number,
    ordersList: Array<Order.AsObject>,
    debugMessage: string,
  }
}

export class Order extends jspb.Message {
  getMove(): Move | undefined;
  setMove(value?: Move): Order;
  hasMove(): boolean;
  clearMove(): Order;

  getCatch(): Catch | undefined;
  setCatch(value?: Catch): Order;
  hasCatch(): boolean;
  clearCatch(): Order;

  getKick(): Kick | undefined;
  setKick(value?: Kick): Order;
  hasKick(): boolean;
  clearKick(): Order;

  getJump(): Jump | undefined;
  setJump(value?: Jump): Order;
  hasJump(): boolean;
  clearJump(): Order;

  getActionCase(): Order.ActionCase;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Order.AsObject;
  static toObject(includeInstance: boolean, msg: Order): Order.AsObject;
  static serializeBinaryToWriter(message: Order, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Order;
  static deserializeBinaryFromReader(message: Order, reader: jspb.BinaryReader): Order;
}

export namespace Order {
  export type AsObject = {
    move?: Move.AsObject,
    pb_catch?: Catch.AsObject,
    kick?: Kick.AsObject,
    jump?: Jump.AsObject,
  }

  export enum ActionCase { 
    ACTION_NOT_SET = 0,
    MOVE = 1,
    CATCH = 2,
    KICK = 3,
    JUMP = 4,
  }
}

export class Move extends jspb.Message {
  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): Move;
  hasVelocity(): boolean;
  clearVelocity(): Move;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Move.AsObject;
  static toObject(includeInstance: boolean, msg: Move): Move.AsObject;
  static serializeBinaryToWriter(message: Move, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Move;
  static deserializeBinaryFromReader(message: Move, reader: jspb.BinaryReader): Move;
}

export namespace Move {
  export type AsObject = {
    velocity?: physics_pb.Velocity.AsObject,
  }
}

export class Catch extends jspb.Message {
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Catch.AsObject;
  static toObject(includeInstance: boolean, msg: Catch): Catch.AsObject;
  static serializeBinaryToWriter(message: Catch, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Catch;
  static deserializeBinaryFromReader(message: Catch, reader: jspb.BinaryReader): Catch;
}

export namespace Catch {
  export type AsObject = {
  }
}

export class Kick extends jspb.Message {
  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): Kick;
  hasVelocity(): boolean;
  clearVelocity(): Kick;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Kick.AsObject;
  static toObject(includeInstance: boolean, msg: Kick): Kick.AsObject;
  static serializeBinaryToWriter(message: Kick, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Kick;
  static deserializeBinaryFromReader(message: Kick, reader: jspb.BinaryReader): Kick;
}

export namespace Kick {
  export type AsObject = {
    velocity?: physics_pb.Velocity.AsObject,
  }
}

export class Jump extends jspb.Message {
  getVelocity(): physics_pb.Velocity | undefined;
  setVelocity(value?: physics_pb.Velocity): Jump;
  hasVelocity(): boolean;
  clearVelocity(): Jump;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Jump.AsObject;
  static toObject(includeInstance: boolean, msg: Jump): Jump.AsObject;
  static serializeBinaryToWriter(message: Jump, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): Jump;
  static deserializeBinaryFromReader(message: Jump, reader: jspb.BinaryReader): Jump;
}

export namespace Jump {
  export type AsObject = {
    velocity?: physics_pb.Velocity.AsObject,
  }
}

