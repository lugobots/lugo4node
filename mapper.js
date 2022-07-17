import { Point } from './pb/physics_pb';
import * as lugo from './pb/server_pb';
import { SPECS } from "./specs";
// ErrMinCols defines an error for invalid number of cols
const ErrMinCols = new Error("number of cols lower the minimum");
// ErrMaxCols defines an error for invalid number of cols
const ErrMaxCols = new Error("number of cols higher the maximum");
// ErrMinRows defines an error for invalid number of rows
const ErrMinRows = new Error("number of rows lower the minimum");
// ErrMaxRows defines an error for invalid number of rows
const ErrMaxRows = new Error("number of rows higher the maximum");
// MinCols Define the min number of cols allowed on the field division by the Map
const MinCols = 4;
// MinRows Define the min number of rows allowed on the field division by the Map
const MinRows = 2;
// MaxCols Define the max number of cols allowed on the field division by the Map
const MaxCols = 200;
// MaxRows Define the max number of rows allowed on the field division by the Map
const MaxRows = 100;
export class Region {
    /**
     *
     * @param col {number}
     * @param row {number}
     * @param side {lugo.Team.Side}
     * @param center {physics.Point}
     * @param positioner  {Map}
     */
    constructor(col, row, side, center, positioner) {
        this.col = col;
        this.row = row;
        this.side = side;
        this.center = center;
        this.positioner = positioner;
    }
    /**
     *
     * @param {Region} region
     * @return boolean
     */
    eq(region) {
        return region.getCol() === this.col && region.side === this.side && region.getRow() === this.row;
    }
    /**
     *
     * @returns {number}
     */
    getCol() {
        return this.col;
    }
    /**
     *
     * @returns {number}
     */
    getRow() {
        return this.row;
    }
    /**
     * @return {physics.Point}
     */
    getCenter() {
        return this.center;
    }
    /**
     *
     * @returns {string}
     */
    toString() {
        return `{${this.col},${this.row}`;
    }
    /**
     *
     * @return {Region}
     */
    front() {
        return this.positioner.getRegion(Math.max(this.col + 1, 0), this.row);
    }
    /**
     *
     * @return {Region}
     */
    back() {
        return this.positioner.getRegion(Math.max(this.col - 1, 0), this.row);
    }
    /**
     *
     * @return {Region}
     */
    left() {
        return this.positioner.getRegion(this.col, Math.max(this.row + 1, 0));
    }
    /**
     *
     * @return {Region}
     */
    right() {
        return this.positioner.getRegion(this.col, Math.max(this.row - 1, 0));
    }
}
export class Map {
    /**
     *
     * @param cols {number}
     * @param rows {number}
     * @param side {lugo.Team.Side}
     */
    constructor(cols, rows, side) {
        if (cols < MinCols) {
            throw ErrMinCols;
        }
        if (cols > MaxCols) {
            throw ErrMaxCols;
        }
        if (rows < MinRows) {
            throw ErrMinRows;
        }
        if (rows > MaxRows) {
            throw ErrMaxRows;
        }
        this.cols = cols;
        this.rows = rows;
        this.side = side;
        this.regionWidth = SPECS.MAX_X_COORDINATE / cols;
        this.regionHeight = SPECS.MAX_Y_COORDINATE / rows;
    }
    /**
     * @param col {number}
     * @param row {number}
     * @return {Region}
     */
    getRegion(col, row) {
        col = Math.max(0, col);
        col = Math.min(this.cols - 1, col);
        row = Math.max(0, row);
        row = Math.min(this.rows - 1, row);
        let center = new Point();
        center.setX(Math.round((col * this.regionWidth) + (this.regionWidth / 2)));
        center.setY(Math.round((row * this.regionHeight) + (this.regionHeight / 2)));
        if (this.side === lugo.Team.Side.AWAY) {
            center = mirrorCoordsToAway(center);
        }
        return new Region(col, row, this.side, center, this);
    }
    /**
     * @param {physics.Point} point
     * @return Region
     */
    getRegionFromPoint(point) {
        if (this.side === lugo.Team.Side.AWAY) {
            point = mirrorCoordsToAway(point);
        }
        const cx = Math.floor(point.getX() / this.regionWidth);
        const cy = Math.floor(point.getY() / this.regionHeight);
        const col = Math.min(cx, this.cols - 1);
        const row = Math.min(cy, this.rows - 1);
        return this.getRegion(col, row);
    }
}
/**
 *
 * @param center
 * @return {Point}
 */
function mirrorCoordsToAway(center) {
    let mirrored = new Point();
    mirrored.setX(SPECS.MAX_X_COORDINATE - center.getX());
    mirrored.setY(SPECS.MAX_Y_COORDINATE - center.getY());
    return mirrored;
}
