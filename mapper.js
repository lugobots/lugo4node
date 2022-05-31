'use strict';
const field = require("./field");
require(`./pb/server_pb`)

// ErrMinCols defines an error for invalid number of cols
const ErrMinCols = new Error("number of cols lower the minimum")
// ErrMaxCols defines an error for invalid number of cols
const ErrMaxCols = new Error("number of cols higher the maximum")
// ErrMinRows defines an error for invalid number of rows
const ErrMinRows = new Error("number of rows lower the minimum")
// ErrMaxRows defines an error for invalid number of rows
const ErrMaxRows = new Error("number of rows higher the maximum")


// MinCols Define the min number of cols allowed on the field division by the Map
const MinCols = 4
// MinRows Define the min number of rows allowed on the field division by the Map
const MinRows = 2
// MaxCols Define the max number of cols allowed on the field division by the Map
const MaxCols = 200
// MaxRows Define the max number of rows allowed on the field division by the Map
const MaxRows = 100

class Region {
    /**
     * @type {number}
     */
    #col;
    /**
     * @type {number}
     */
    #row;

    /**
     * @type {proto.lugo.Team.Side}
     */
    #side;
    /**
     * @var {proto.lugo.Point}
     */
    #center;
    /**
     * @var {Map}
     */
    #positioner;

    /**
     *
     * @param col {int}
     * @param row {int}
     * @param side {proto.lugo.Team.Side}
     * @param center {proto.lugo.Point}
     * @param positioner  {Map}
     */
    constructor(col, row, side, center, positioner) {
        this.#col = col
        this.#row = row
        this.#side = side
        this.#center = center
        this.#positioner = positioner
    }

    /**
     *
     * @param region Region
     */
    eq(region) {
        return region.getCol() === this.#col && region.#side === this.#side && region.getRow() === this.#row
    }

    /**
     *
     * @returns {number}
     */
    getCol() {
        return this.#col
    }

    /**
     *
     * @returns {number}
     */
    getRow() {
        return this.#row
    }

    /**
     * @return {proto.lugo.Point}
     */
    getCenter() {
        return this.#center
    }

    /**
     *
     * @returns {string}
     */
    toString() {
        return `{${this.#col},${this.#row}`
    }

    /**
     *
     * @return {Region}
     */
    front() {
        return this.#positioner.getRegion(Math.max(this.#col + 1, 0), this.#row)
    }

    /**
     *
     * @return {Region}
     */
    back() {
        return this.#positioner.getRegion(Math.max(this.#col - 1, 0), this.#row)
    }

    /**
     *
     * @return {Region}
     */
    left() {
        return this.#positioner.getRegion(this.#col, Math.max(this.#row + 1, 0))
    }

    /**
     *
     * @return {Region}
     */
    right() {
        return this.#positioner.getRegion(this.#col, Math.max(this.#row - 1, 0))
    }
}

class Map {
    /**
     * @type {number}
     */
    #cols;

    /**
     * @type {number}
     */
    #rows;
    /**
     * @type {proto.lugo.Team.Side}
     */
    #side;

    #regionWidth;
    #regionHeight;

    /**
     *
     * @param cols {number}
     * @param rows {number}
     * @param side {proto.lugo.Team.Side}
     */
    constructor(cols, rows, side) {
        if (cols < MinCols) {
            throw ErrMaxCols
        }
        if (cols > MaxCols) {
            return ErrMaxCols
        }
        if (rows < MinRows) {
            return ErrMinRows
        }
        if (rows > MaxRows) {
            return ErrMaxRows
        }

        this.#cols = cols
        this.#rows = rows
        this.#side = side
        this.#regionWidth = field.MAX_X_COORDINATE / cols
        this.#regionHeight = field.MAX_Y_COORDINATE / rows
    }

    /**
     * @param col {number}
     * @param row {number}
     * @return Region
     */
    getRegion(col, row) {
        col = Math.max(0, col)
        col = Math.min(this.#cols - 1, col)

        row = Math.max(0, row)
        row = Math.min(this.#rows - 1, row)

        let center = new proto.lugo.Point()
         center.setX(Math.round((col * this.#regionWidth) + (this.#regionWidth / 2)))
         center.setY(Math.round((row * this.#regionHeight) + (this.#regionHeight / 2)))

        if (this.#side === proto.lugo.Team.Side.AWAY) {
            center = mirrorCoordsToAway(center)
        }

        return new Region(
            col,
            row,
            this.#side,
            center,
            this,
        )
    }

    /**
     * @var point  {proto.lugo.Point}
     * @return Region
     */
    getRegionFromPoint(point) {
        if (this.#side === proto.lugo.Team.Side.AWAY) {
            point = mirrorCoordsToAway(point)
        }
        const cx = Math.floor(point.getX() / this.#regionWidth)
        const cy = Math.floor(point.getY() / this.#regionHeight)
        const col = Math.min(cx, this.#cols - 1)
        const row = Math.min(cy, this.#rows - 1)
        return this.getRegion(col, row)
    }
}

/**
 *
 * @param center
 * @return {proto.lugo.Point}
 */
function mirrorCoordsToAway(center) {
    let mirrored = new proto.lugo.Point()
    mirrored.setX(field.MAX_X_COORDINATE - center.getX())
    mirrored.setY(field.MAX_Y_COORDINATE - center.getY())
    return mirrored
}

module.exports = {
    Region,
    Map,
}
