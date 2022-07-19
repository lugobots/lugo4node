"use strict";
exports.__esModule = true;
exports.sub = exports.getScaledVector = exports.getLength = exports.normalize = exports.NewVector = void 0;
var physics_pb_js_1 = require("./pb/physics_pb.js");
/**
 *
 * @param {Point} from
 * @param {Point} to
 * @returns {Vector}
 */
function NewVector(from, to) {
    var v = new physics_pb_js_1.Vector();
    v.setX(to.getX() - from.getX());
    v.setY(to.getY() - from.getY());
    if (isInValidateVector(v)) {
        throw new Error("an vector cannot have zero length");
    }
    return v;
}
exports.NewVector = NewVector;
/**
 *
 * @param {Vector} v
 * @returns {Vector} a new vector with same direction but normalized to 0-100
 */
function normalize(v) {
    var length = getLength(v);
    return getScaledVector(v, 100 / length);
}
exports.normalize = normalize;
/**
 *
 * @param {Vector} v
 * @returns {number}
 */
function getLength(v) {
    return Math.hypot(v.getX(), v.getY());
}
exports.getLength = getLength;
/**
 *
 * @param {Vector} v
 * @param {number} scale
 * @returns {Vector}
 */
function getScaledVector(v, scale) {
    if (scale <= 0) {
        throw new Error("vector can not have zero length");
    }
    var v2 = new physics_pb_js_1.Vector();
    v2.setX(v.getX() * scale);
    v2.setY(v.getY() * scale);
    return v2;
}
exports.getScaledVector = getScaledVector;
/**
 *
 * @param {Vector} originalV
 * @param {Vector} subV
 * @returns {Vector}
 */
function sub(originalV, subV) {
    var newX = originalV.getX() - subV.getX();
    var newY = originalV.getY() - subV.getY();
    var newVector = new physics_pb_js_1.Vector();
    newVector.setX(newX);
    newVector.setY(newY);
    if (isInValidateVector(newVector)) {
        throw new Error("could not subtract vectors an vector cannot have zero length");
    }
    return newVector;
}
exports.sub = sub;
/**
 *
 * @param {Vector} v
 */
function isInValidateVector(v) {
    return (v.getX() === 0 && v.getY() === 0);
}
