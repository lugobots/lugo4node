const assert = require('assert');
const mapper = require('../mapper')
const field = require('../SPECS')
const {FIELD} = require("../main");

describe('Region', () => {
    it('should identify an equal region', () => {
        const regionA = new mapper.Region(5, 10, proto.lugo.Team.Side.HOME, null, null)
        const regionEq = new mapper.Region(5, 10, proto.lugo.Team.Side.HOME, null, null)
        const regionDiffCoords = new mapper.Region(14, 10, proto.lugo.Team.Side.HOME, null, null)
        const regionDiffSide = new mapper.Region(15, 10, proto.lugo.Team.Side.AWAY, null, null)

        assert.deepStrictEqual(regionA.eq(regionEq), true)
        assert.deepStrictEqual(regionA.eq(regionDiffCoords), false)
        assert.deepStrictEqual(regionA.eq(regionDiffSide), false)
    });

    it('should find regions around', () => {
        const positioner = new mapper.Map(10, 10, proto.lugo.Team.Side.HOME)
        const region = positioner.getRegion(5, 8)

        assert.deepStrictEqual(region.getCol(), 5)
        assert.deepStrictEqual(region.getRow(), 8)

        assert.deepStrictEqual(region.front().getRow(), 8)
        assert.deepStrictEqual(region.front().getCol(), 6)

        assert.deepStrictEqual(region.back().getRow(), 8)
        assert.deepStrictEqual(region.back().getCol(), 4)

        assert.deepStrictEqual(region.left().getRow(), 9)
        assert.deepStrictEqual(region.left().getCol(), 5)

        assert.deepStrictEqual(region.right().getRow(), 7)
        assert.deepStrictEqual(region.right().getCol(), 5)
    })

    it('should should not fo over the limits', () => {
        const positioner = new mapper.Map(10, 10, proto.lugo.Team.Side.HOME)
        const cornerDownRight = positioner.getRegion(0, 0)

        assert.deepStrictEqual(cornerDownRight.front().getRow(), 0)
        assert.deepStrictEqual(cornerDownRight.front().getCol(), 1)

        assert.deepStrictEqual(cornerDownRight.back().getRow(), 0)
        assert.deepStrictEqual(cornerDownRight.back().getCol(), 0)

        assert.deepStrictEqual(cornerDownRight.left().getRow(), 1)
        assert.deepStrictEqual(cornerDownRight.left().getCol(), 0)

        assert.deepStrictEqual(cornerDownRight.right().getRow(), 0)
        assert.deepStrictEqual(cornerDownRight.right().getCol(), 0)

        const cornerUpLeft = positioner.getRegion(9, 9)
        assert.deepStrictEqual(cornerUpLeft.front().getRow(), 9)
        assert.deepStrictEqual(cornerUpLeft.front().getCol(), 9)

        assert.deepStrictEqual(cornerUpLeft.back().getRow(), 9)
        assert.deepStrictEqual(cornerUpLeft.back().getCol(), 8)

        assert.deepStrictEqual(cornerUpLeft.left().getRow(), 9)
        assert.deepStrictEqual(cornerUpLeft.left().getCol(), 9)

        assert.deepStrictEqual(cornerUpLeft.right().getRow(), 8)
        assert.deepStrictEqual(cornerUpLeft.right().getCol(), 9)
    })

    it('should find the correct region from a point', () => {
        const positioner = new mapper.Map(10, 10, proto.lugo.Team.Side.HOME)
        const regionWidth = field.MAX_X_COORDINATE / 10
        const regionHeight = field.MAX_Y_COORDINATE / 10

        const bottomLeft = new proto.lugo.Point()
        bottomLeft.setX(0)
        bottomLeft.setY(0)
        const cornerBottomLeft = positioner.getRegionFromPoint(bottomLeft)
        assert.deepStrictEqual(0, cornerBottomLeft.getCol())
        assert.deepStrictEqual(0, cornerBottomLeft.getRow())

        const bottomRight = new proto.lugo.Point()
        bottomRight.setX(FIELD.MAX_X_COORDINATE)
        bottomRight.setY(1)
        const cornerBottomRight = positioner.getRegionFromPoint(bottomRight)
        assert.deepStrictEqual(9, cornerBottomRight.getCol())
        assert.deepStrictEqual(0, cornerBottomRight.getRow())

        const topRight = new proto.lugo.Point()
        topRight.setX(FIELD.MAX_X_COORDINATE)
        topRight.setY(FIELD.MAX_Y_COORDINATE)
        const cornerTopRight = positioner.getRegionFromPoint(topRight)
        assert.deepStrictEqual(9, cornerTopRight.getCol())
        assert.deepStrictEqual(9, cornerTopRight.getRow())

        const topLeft = new proto.lugo.Point()
        topLeft.setX(0)
        topLeft.setY(FIELD.MAX_Y_COORDINATE)
        const cornerTopLeft = positioner.getRegionFromPoint(topLeft)
        assert.deepStrictEqual(0, cornerTopLeft.getCol())
        assert.deepStrictEqual(9, cornerTopLeft.getRow())

        // imprecise coordinates
        const southEastInRegion = new proto.lugo.Point()
        southEastInRegion.setX(regionWidth + 5)
        southEastInRegion.setY(regionHeight + 5)
        const regionA = positioner.getRegionFromPoint(southEastInRegion)
        assert.deepStrictEqual(1, regionA.getCol())
        assert.deepStrictEqual(1, regionA.getRow())

        const northWestInRegion = new proto.lugo.Point()
        northWestInRegion.setX(regionWidth - 5)
        northWestInRegion.setY(regionHeight - 5)
        const regionB = positioner.getRegionFromPoint(northWestInRegion)
        assert.deepStrictEqual(0, regionB.getCol())
        assert.deepStrictEqual(0, regionB.getRow())
    })
});
