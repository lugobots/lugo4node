import * as physics from './pb/physics_pb.js';
import * as lugo from './pb/server_pb.js';
export declare class Region {
    /**
     * @type {number}
     */
    col: any;
    /**
     * @type {number}
     */
    row: any;
    /**
     * @type {lugo.Team..Side}
     */
    side: any;
    /**
     * @type {physics.Point}
     */
    center: any;
    /**
     * @type {Mapper}
     */
    positioner: any;
    /**
     *
     * @param col {number}
     * @param row {number}
     * @param side {lugo.Team.Side}
     * @param center {physics.Point}
     * @param positioner  {Mapper}
     */
    constructor(col: number, row: number, side: lugo.Team.Side, center: physics.Point, positioner: Mapper);
    /**
     *
     * @param {Region} region
     * @return boolean
     */
    eq(region: Region): boolean;
    /**
     *
     * @returns {number}
     */
    getCol(): number;
    /**
     *
     * @returns {number}
     */
    getRow(): number;
    /**
     * @return {physics.Point}
     */
    getCenter(): physics.Point;
    /**
     *
     * @returns {string}
     */
    toString(): string;
    /**
     *
     * @return {Region}
     */
    front(): Region;
    /**
     *
     * @return {Region}
     */
    back(): Region;
    /**
     *
     * @return {Region}
     */
    left(): Region;
    /**
     *
     * @return {Region}
     */
    right(): Region;
}
export declare class Mapper {
    /**
     * @type {number}
     */
    private readonly cols;
    /**
     * @type {number}
     */
    private readonly rows;
    /**
     * @type {lugo.Team.Side}
     * @private
     */
    private readonly side;
    private readonly regionWidth;
    private readonly regionHeight;
    /**
     *
     * @param cols {number}
     * @param rows {number}
     * @param side {lugo.Team.Side}
     */
    constructor(cols: number, rows: number, side: lugo.Team.Side);
    /**
     * @param col {number}
     * @param row {number}
     * @return {Region}
     */
    getRegion(col: number, row: number): Region;
    /**
     * @param {physics.Point} point
     * @return Region
     */
    getRegionFromPoint(point: physics.Point): Region;
}
