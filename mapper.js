'use strict';
const field = require("./field");
const Point = require('./proto_wrapper').Point

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
    #col;
    #row;
    #side;
    /**
     * @var {Point}
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
     * @param side {int}
     * @param center {Point}
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

    getCol() {
        return this.#col
    }

    getRow() {
        return this.#row
    }

    /**
     * @return {Point}
     */
    getCenter() {
        return this.#center
    }

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
     * @type {int}
     */
    #cols;

    /**
     * @type {int}
     */
    #rows;
    /**
     * @type {int}
     */
    #side;

    #regionWidth;
    #regionHeight;

    /**
     *
     * @param cols {int}
     * @param rows {int}
     * @param side {int}
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
     * @param col {int}
     * @param row {int}
     * @return Region
     */
    getRegion(col, row) {
        col = Math.max(0, col)
        col = Math.min(this.#cols - 1, col)

        row = Math.max(0, row)
        row = Math.min(this.#rows - 1, row)

        let center = new Point(
            (col * this.#regionWidth) + (this.#regionWidth / 2),
            (col * this.#regionHeight) + (this.#regionHeight / 2),
        )

        if (this.#side === field.SIDE.AWAY) {
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
     * @var point  {Point}
     * @return Region
     */
    getPointRegion(point) {
        if (this.#side === field.SIDE.AWAY) {
            point = mirrorCoordsToAway(point)
        }
        const cx = point.x / this.#regionWidth
        const cy = point.y / this.#regionHeight
        const col = Math.min(cx, this.#cols - 1)
        const row = Math.min(cy, this.#rows - 1)
        return this.getRegion(col, row)
    }
}

/**
 *
 * @param center
 * @return {Point}
 */
function mirrorCoordsToAway(center) {
    return new Point(
        field.MAX_X_COORDINATE - center.x,
        field.MAX_Y_COORDINATE - center.y,
    )
}

module.exports = {
    Region,
    Map,
}