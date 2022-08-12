import { Point, Vector } from './pb/physics_pb.js';
/**
 *
 * @param {Point} from
 * @param {Point} to
 * @returns {Vector}
 */
export declare function NewVector(from: Point, to: Point): Vector;
/**
 *
 * @param {Vector} v
 * @returns {Vector} a new vector with same direction but normalized to 0-100
 */
export declare function normalize(v: Vector): Vector;
/**
 *
 * @param {Vector} v
 * @returns {number}
 */
export declare function getLength(v: Vector): number;
/**
 *
 * @param {Vector} v
 * @param {number} scale
 * @returns {Vector}
 */
export declare function getScaledVector(v: Vector, scale: number): Vector;
/**
 *
 * @param {Vector} originalV
 * @param {Vector} subV
 * @returns {Vector}
 */
export declare function sub(originalV: Vector, subV: Vector): Vector;
