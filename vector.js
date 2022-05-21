'use strict';
require('./pb/server_pb')

/**
 *
 * @param {proto.lugo.Point} from
 * @param {proto.lugo.Point} to
 * @returns {proto.lugo.Vector}
 */
function NewVector(from, to) {
    const v = new proto.lugo.Vector()
    v.setX(to.getX() - from.getX())
    v.setY(to.getY() - from.getY())
    if (!validateVector(v)) {
        throw new Error("an vector cannot have zero length")
    }
    return v
}

/**
 *
 * @param {proto.lugo.Vector} v
 * @returns {proto.lugo.Vector} a new vector with same direction but normalized to 0-100
 */
function normalize(v) {
    const length = getLength(v)
    return getScaledVector(v, 100 / length)
}

/**
 *
 * @param {proto.lugo.Vector} v
 * @returns {number}
 */
function getLength(v) {
    return Math.hypot(v.getX(), v.getY())
}

/**
 *
 * @param {proto.lugo.Vector} v
 * @param {number} scale
 * @returns {proto.lugo.Vector}
 */
function getScaledVector(v, scale) {
    if (scale <= 0) {
        throw new Error("vector can not have zero length")
    }
    const v2 = new proto.lugo.Vector()
    v2.setX(v.getX() * scale)
    v2.setY(v.getY() * scale)

    return v2
}

/**
 *
 * @param {proto.lugo.Vector} originalV
 * @param {proto.lugo.Vector} subV
 * @returns {proto.lugo.Vector}
 */
function sub(originalV, subV) {
    const newX = originalV.getX() - subV.getX()
    const newY = originalV.getY() - subV.getY()

    const newVector = new proto.lugo.Vector()
    newVector.setX(newX)
    newVector.setY(newY)
    if (!validateVector(newVector)) {
        throw new Error("could not subtract vectors an vector cannot have zero length")
    }
    return newVector
}

/**
 *
 * @param {proto.lugo.Vector} v
 */
function validateVector(v) {
    return (v.getX() !== 0 && v.getY() !== 0)
}



module.exports = {
    NewVector,
    normalize,
    getLength,
    getScaledVector,
    sub
}