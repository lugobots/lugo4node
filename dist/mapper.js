"use strict";
exports.__esModule = true;
exports.Mapper = exports.Region = void 0;
var goal_js_1 = require("./goal.js");
var physics = require("./pb/physics_pb.js");
var lugo = require("./pb/server_pb.js");
var Point = physics.Point;
var specs_js_1 = require("./specs.js");
// ErrMinCols defines an error for invalid number of cols
var ErrMinCols = new Error("number of cols lower the minimum");
// ErrMaxCols defines an error for invalid number of cols
var ErrMaxCols = new Error("number of cols higher the maximum");
// ErrMinRows defines an error for invalid number of rows
var ErrMinRows = new Error("number of rows lower the minimum");
// ErrMaxRows defines an error for invalid number of rows
var ErrMaxRows = new Error("number of rows higher the maximum");
// MinCols Define the min number of cols allowed on the field division by the Mapper
var MinCols = 4;
// MinRows Define the min number of rows allowed on the field division by the Mapper
var MinRows = 2;
// MaxCols Define the max number of cols allowed on the field division by the Mapper
var MaxCols = 200;
// MaxRows Define the max number of rows allowed on the field division by the Mapper
var MaxRows = 100;
var Region = /** @class */ (function () {
    /**
     *
     * @param col {number}
     * @param row {number}
     * @param side {lugo.Team.Side}
     * @param center {physics.Point}
     * @param positioner  {Mapper}
     */
    function Region(col, row, side, center, positioner) {
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
    Region.prototype.eq = function (region) {
        return region.getCol() === this.col && region.side === this.side && region.getRow() === this.row;
    };
    /**
     *
     * @returns {number}
     */
    Region.prototype.getCol = function () {
        return this.col;
    };
    /**
     *
     * @returns {number}
     */
    Region.prototype.getRow = function () {
        return this.row;
    };
    /**
     * @return {physics.Point}
     */
    Region.prototype.getCenter = function () {
        return this.center;
    };
    /**
     *
     * @returns {string}
     */
    Region.prototype.toString = function () {
        return "{".concat(this.col, ",").concat(this.row);
    };
    /**
     *
     * @return {Region}
     */
    Region.prototype.front = function () {
        return this.positioner.getRegion(Math.max(this.col + 1, 0), this.row);
    };
    /**
     *
     * @return {Region}
     */
    Region.prototype.back = function () {
        return this.positioner.getRegion(Math.max(this.col - 1, 0), this.row);
    };
    /**
     *
     * @return {Region}
     */
    Region.prototype.left = function () {
        return this.positioner.getRegion(this.col, Math.max(this.row + 1, 0));
    };
    /**
     *
     * @return {Region}
     */
    Region.prototype.right = function () {
        return this.positioner.getRegion(this.col, Math.max(this.row - 1, 0));
    };
    return Region;
}());
exports.Region = Region;
var Mapper = /** @class */ (function () {
    /**
     *
     * @param cols {number}
     * @param rows {number}
     * @param side {lugo.Team.Side}
     */
    function Mapper(cols, rows, side) {
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
        this.regionWidth = specs_js_1.SPECS.MAX_X_COORDINATE / cols;
        this.regionHeight = specs_js_1.SPECS.MAX_Y_COORDINATE / rows;
    }
    Mapper.prototype.getDefenseGoal = function () {
        if (this.side === lugo.Team.Side.HOME) {
            return goal_js_1.HOME_GOAL;
        }
        return goal_js_1.AWAY_GOAL;
    };
    Mapper.prototype.getAttackGoal = function () {
        if (this.side === lugo.Team.Side.AWAY) {
            return goal_js_1.HOME_GOAL;
        }
        return goal_js_1.AWAY_GOAL;
    };
    /**
     * @param col {number}
     * @param row {number}
     * @return {Region}
     */
    Mapper.prototype.getRegion = function (col, row) {
        col = Math.max(0, col);
        col = Math.min(this.cols - 1, col);
        row = Math.max(0, row);
        row = Math.min(this.rows - 1, row);
        var center = new Point();
        center.setX(Math.round((col * this.regionWidth) + (this.regionWidth / 2)));
        center.setY(Math.round((row * this.regionHeight) + (this.regionHeight / 2)));
        if (this.side === lugo.Team.Side.AWAY) {
            center = mirrorCoordsToAway(center);
        }
        return new Region(col, row, this.side, center, this);
    };
    /**
     * @param {physics.Point} point
     * @return Region
     */
    Mapper.prototype.getRegionFromPoint = function (point) {
        if (this.side === lugo.Team.Side.AWAY) {
            point = mirrorCoordsToAway(point);
        }
        var cx = Math.floor(point.getX() / this.regionWidth);
        var cy = Math.floor(point.getY() / this.regionHeight);
        var col = Math.min(cx, this.cols - 1);
        var row = Math.min(cy, this.rows - 1);
        return this.getRegion(col, row);
    };
    return Mapper;
}());
exports.Mapper = Mapper;
/**
 *
 * @param center
 * @return {Point}
 */
function mirrorCoordsToAway(center) {
    var mirrored = new Point();
    mirrored.setX(specs_js_1.SPECS.MAX_X_COORDINATE - center.getX());
    mirrored.setY(specs_js_1.SPECS.MAX_Y_COORDINATE - center.getY());
    return mirrored;
}
