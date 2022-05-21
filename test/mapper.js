const assert = require('assert');
const mapper = require('../mapper')
const field = require('../field')

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

});