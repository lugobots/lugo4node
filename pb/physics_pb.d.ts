import * as jspb from 'google-protobuf'



export class Vector extends jspb.Message {
  getX(): number;
  setX(value: number): Vector;

  getY(): number;
  setY(value: number): Vector;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Vector.AsObject;
  static toObject(includeInstance: boolean, msg: Vector): Vector.AsObject;
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
  getDirection(): Vector | undefined;
  setDirection(value?: Vector): Velocity;
  hasDirection(): boolean;
  clearDirection(): Velocity;

  getSpeed(): number;
  setSpeed(value: number): Velocity;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): Velocity.AsObject;
  static toObject(includeInstance: boolean, msg: Velocity): Velocity.AsObject;
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

