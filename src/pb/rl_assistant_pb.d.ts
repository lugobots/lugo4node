// package: lugo
// file: rl_assistant.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as server_pb from "./server_pb";

export class RLSessionConfig extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RLSessionConfig.AsObject;
    static toObject(includeInstance: boolean, msg: RLSessionConfig): RLSessionConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RLSessionConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RLSessionConfig;
    static deserializeBinaryFromReader(message: RLSessionConfig, reader: jspb.BinaryReader): RLSessionConfig;
}

export namespace RLSessionConfig {
    export type AsObject = {
    }
}

export class PlayerOrdersOnRLSession extends jspb.Message { 
    getTeamSide(): server_pb.Team.Side;
    setTeamSide(value: server_pb.Team.Side): PlayerOrdersOnRLSession;
    getNumber(): number;
    setNumber(value: number): PlayerOrdersOnRLSession;
    getBehaviour(): string;
    setBehaviour(value: string): PlayerOrdersOnRLSession;
    clearOrdersList(): void;
    getOrdersList(): Array<server_pb.Order>;
    setOrdersList(value: Array<server_pb.Order>): PlayerOrdersOnRLSession;
    addOrders(value?: server_pb.Order, index?: number): server_pb.Order;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlayerOrdersOnRLSession.AsObject;
    static toObject(includeInstance: boolean, msg: PlayerOrdersOnRLSession): PlayerOrdersOnRLSession.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlayerOrdersOnRLSession, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlayerOrdersOnRLSession;
    static deserializeBinaryFromReader(message: PlayerOrdersOnRLSession, reader: jspb.BinaryReader): PlayerOrdersOnRLSession;
}

export namespace PlayerOrdersOnRLSession {
    export type AsObject = {
        teamSide: server_pb.Team.Side,
        number: number,
        behaviour: string,
        ordersList: Array<server_pb.Order.AsObject>,
    }
}

export class PlayersOrders extends jspb.Message { 
    getDefaultBehaviour(): string;
    setDefaultBehaviour(value: string): PlayersOrders;
    clearPlayersOrdersList(): void;
    getPlayersOrdersList(): Array<PlayerOrdersOnRLSession>;
    setPlayersOrdersList(value: Array<PlayerOrdersOnRLSession>): PlayersOrders;
    addPlayersOrders(value?: PlayerOrdersOnRLSession, index?: number): PlayerOrdersOnRLSession;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlayersOrders.AsObject;
    static toObject(includeInstance: boolean, msg: PlayersOrders): PlayersOrders.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: PlayersOrders, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): PlayersOrders;
    static deserializeBinaryFromReader(message: PlayersOrders, reader: jspb.BinaryReader): PlayersOrders;
}

export namespace PlayersOrders {
    export type AsObject = {
        defaultBehaviour: string,
        playersOrdersList: Array<PlayerOrdersOnRLSession.AsObject>,
    }
}

export class TurnOutcome extends jspb.Message { 

    hasGameSnapshot(): boolean;
    clearGameSnapshot(): void;
    getGameSnapshot(): server_pb.GameSnapshot | undefined;
    setGameSnapshot(value?: server_pb.GameSnapshot): TurnOutcome;
    getScoreChanged(): boolean;
    setScoreChanged(value: boolean): TurnOutcome;
    getShotClockExpired(): boolean;
    setShotClockExpired(value: boolean): TurnOutcome;
    getGoalZoneTimerExpired(): boolean;
    setGoalZoneTimerExpired(value: boolean): TurnOutcome;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): TurnOutcome.AsObject;
    static toObject(includeInstance: boolean, msg: TurnOutcome): TurnOutcome.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: TurnOutcome, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): TurnOutcome;
    static deserializeBinaryFromReader(message: TurnOutcome, reader: jspb.BinaryReader): TurnOutcome;
}

export namespace TurnOutcome {
    export type AsObject = {
        gameSnapshot?: server_pb.GameSnapshot.AsObject,
        scoreChanged: boolean,
        shotClockExpired: boolean,
        goalZoneTimerExpired: boolean,
    }
}

export class RLResetConfig extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): RLResetConfig.AsObject;
    static toObject(includeInstance: boolean, msg: RLResetConfig): RLResetConfig.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: RLResetConfig, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): RLResetConfig;
    static deserializeBinaryFromReader(message: RLResetConfig, reader: jspb.BinaryReader): RLResetConfig;
}

export namespace RLResetConfig {
    export type AsObject = {
    }
}
