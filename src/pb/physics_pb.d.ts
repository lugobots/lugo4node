// package: lugo
// file: physics.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class Vector extends jspb.Message { 
    getX(): number;
    setX(value: number): Vector;
    getY(): number;
    setY(value: number): Vector;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Vector.AsObject;
    static toObject(includeInstance: boolean, msg: Vector): Vector.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Vector, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Vector;
    static deserializeBinaryFromReader(message: Vector, reader: jspb.BinaryReader): Vector;
}

export namespace Vector {
    export type AsObject = {
        x: number,
        y: number,
    }
}

export class Point extends jspb.Message { 
    getX(): number;
    setX(value: number): Point;
    getY(): number;
    setY(value: number): Point;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Point.AsObject;
    static toObject(includeInstance: boolean, msg: Point): Point.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Point, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Point;
    static deserializeBinaryFromReader(message: Point, reader: jspb.BinaryReader): Point;
}

export namespace Point {
    export type AsObject = {
        x: number,
        y: number,
    }
}

export class Velocity extends jspb.Message { 

    hasDirection(): boolean;
    clearDirection(): void;
    getDirection(): Vector | undefined;
    setDirection(value?: Vector): Velocity;
    getSpeed(): number;
    setSpeed(value: number): Velocity;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Velocity.AsObject;
    static toObject(includeInstance: boolean, msg: Velocity): Velocity.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Velocity, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Velocity;
    static deserializeBinaryFromReader(message: Velocity, reader: jspb.BinaryReader): Velocity;
}

export namespace Velocity {
    export type AsObject = {
        direction?: Vector.AsObject,
        speed: number,
    }
}
