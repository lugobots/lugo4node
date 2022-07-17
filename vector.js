import { Point, Vector, Velocity } from './pb/physics_pb';
export { Point, Vector, Velocity };
/**
 *
 * @param {Point} from
 * @param {Point} to
 * @returns {Vector}
 */
export function NewVector(from, to) {
    const v = new Vector();
    v.setX(to.getX() - from.getX());
    v.setY(to.getY() - from.getY());
    if (isInValidateVector(v)) {
        throw new Error("an vector cannot have zero length");
    }
    return v;
}
/**
 *
 * @param {Vector} v
 * @returns {Vector} a new vector with same direction but normalized to 0-100
 */
export function normalize(v) {
    const length = getLength(v);
    return getScaledVector(v, 100 / length);
}
/**
 *
 * @param {Vector} v
 * @returns {number}
 */
export function getLength(v) {
    return Math.hypot(v.getX(), v.getY());
}
/**
 *
 * @param {Vector} v
 * @param {number} scale
 * @returns {Vector}
 */
export function getScaledVector(v, scale) {
    if (scale <= 0) {
        throw new Error("vector can not have zero length");
    }
    const v2 = new Vector();
    v2.setX(v.getX() * scale);
    v2.setY(v.getY() * scale);
    return v2;
}
/**
 *
 * @param {Vector} originalV
 * @param {Vector} subV
 * @returns {Vector}
 */
export function sub(originalV, subV) {
    const newX = originalV.getX() - subV.getX();
    const newY = originalV.getY() - subV.getY();
    const newVector = new Vector();
    newVector.setX(newX);
    newVector.setY(newY);
    if (isInValidateVector(newVector)) {
        throw new Error("could not subtract vectors an vector cannot have zero length");
    }
    return newVector;
}
/**
 *
 * @param {Vector} v
 */
function isInValidateVector(v) {
    return (v.getX() === 0 && v.getY() === 0);
}
