// package: lugo
// file: remote.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";
import * as physics_pb from "./physics_pb";
import * as server_pb from "./server_pb";

export class PauseResumeRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PauseResumeRequest.AsObject;
    static toObject(includeInstance: boolean, msg: PauseResumeRequest): PauseResumeRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: NextOrderRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): NextOrderRequest;
    static deserializeBinaryFromReader(message: NextOrderRequest, reader: jspb.BinaryReader): NextOrderRequest;
}

export namespace NextOrderRequest {
    export type AsObject = {
    }
}

export class BallProperties extends jspb.Message { 

    hasPosition(): boolean;
    clearPosition(): void;
    getPosition(): physics_pb.Point | undefined;
    setPosition(value?: physics_pb.Point): BallProperties;

    hasVelocity(): boolean;
    clearVelocity(): void;
    getVelocity(): physics_pb.Velocity | undefined;
    setVelocity(value?: physics_pb.Velocity): BallProperties;

    hasHolder(): boolean;
    clearHolder(): void;
    getHolder(): server_pb.Player | undefined;
    setHolder(value?: server_pb.Player): BallProperties;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): BallProperties.AsObject;
    static toObject(includeInstance: boolean, msg: BallProperties): BallProperties.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

    hasPosition(): boolean;
    clearPosition(): void;
    getPosition(): physics_pb.Point | undefined;
    setPosition(value?: physics_pb.Point): PlayerProperties;

    hasVelocity(): boolean;
    clearVelocity(): void;
    getVelocity(): physics_pb.Velocity | undefined;
    setVelocity(value?: physics_pb.Velocity): PlayerProperties;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): PlayerProperties.AsObject;
    static toObject(includeInstance: boolean, msg: PlayerProperties): PlayerProperties.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

    hasShotClock(): boolean;
    clearShotClock(): void;
    getShotClock(): server_pb.ShotClock | undefined;
    setShotClock(value?: server_pb.ShotClock): GameProperties;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameProperties.AsObject;
    static toObject(includeInstance: boolean, msg: GameProperties): GameProperties.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

    hasGameSnapshot(): boolean;
    clearGameSnapshot(): void;
    getGameSnapshot(): server_pb.GameSnapshot | undefined;
    setGameSnapshot(value?: server_pb.GameSnapshot): CommandResponse;
    getDetails(): string;
    setDetails(value: string): CommandResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CommandResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CommandResponse): CommandResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
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

export class ResumeListeningRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResumeListeningRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResumeListeningRequest): ResumeListeningRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResumeListeningRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResumeListeningRequest;
    static deserializeBinaryFromReader(message: ResumeListeningRequest, reader: jspb.BinaryReader): ResumeListeningRequest;
}

export namespace ResumeListeningRequest {
    export type AsObject = {
    }
}

export class ResumeListeningResponse extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResumeListeningResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ResumeListeningResponse): ResumeListeningResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResumeListeningResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResumeListeningResponse;
    static deserializeBinaryFromReader(message: ResumeListeningResponse, reader: jspb.BinaryReader): ResumeListeningResponse;
}

export namespace ResumeListeningResponse {
    export type AsObject = {
    }
}

export class ResetPlayerPositionsRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetPlayerPositionsRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResetPlayerPositionsRequest): ResetPlayerPositionsRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetPlayerPositionsRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetPlayerPositionsRequest;
    static deserializeBinaryFromReader(message: ResetPlayerPositionsRequest, reader: jspb.BinaryReader): ResetPlayerPositionsRequest;
}

export namespace ResetPlayerPositionsRequest {
    export type AsObject = {
    }
}

export class ResetGameRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetGameRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ResetGameRequest): ResetGameRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetGameRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetGameRequest;
    static deserializeBinaryFromReader(message: ResetGameRequest, reader: jspb.BinaryReader): ResetGameRequest;
}

export namespace ResetGameRequest {
    export type AsObject = {
    }
}

export class ResetPlayerPositionsResponse extends jspb.Message { 

    hasGameSnapshot(): boolean;
    clearGameSnapshot(): void;
    getGameSnapshot(): server_pb.GameSnapshot | undefined;
    setGameSnapshot(value?: server_pb.GameSnapshot): ResetPlayerPositionsResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ResetPlayerPositionsResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ResetPlayerPositionsResponse): ResetPlayerPositionsResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ResetPlayerPositionsResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ResetPlayerPositionsResponse;
    static deserializeBinaryFromReader(message: ResetPlayerPositionsResponse, reader: jspb.BinaryReader): ResetPlayerPositionsResponse;
}

export namespace ResetPlayerPositionsResponse {
    export type AsObject = {
        gameSnapshot?: server_pb.GameSnapshot.AsObject,
    }
}

export class GameSnapshotRequest extends jspb.Message { 

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameSnapshotRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GameSnapshotRequest): GameSnapshotRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameSnapshotRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameSnapshotRequest;
    static deserializeBinaryFromReader(message: GameSnapshotRequest, reader: jspb.BinaryReader): GameSnapshotRequest;
}

export namespace GameSnapshotRequest {
    export type AsObject = {
    }
}

export class GameSnapshotResponse extends jspb.Message { 

    hasGameSnapshot(): boolean;
    clearGameSnapshot(): void;
    getGameSnapshot(): server_pb.GameSnapshot | undefined;
    setGameSnapshot(value?: server_pb.GameSnapshot): GameSnapshotResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GameSnapshotResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GameSnapshotResponse): GameSnapshotResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GameSnapshotResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GameSnapshotResponse;
    static deserializeBinaryFromReader(message: GameSnapshotResponse, reader: jspb.BinaryReader): GameSnapshotResponse;
}

export namespace GameSnapshotResponse {
    export type AsObject = {
        gameSnapshot?: server_pb.GameSnapshot.AsObject,
    }
}
