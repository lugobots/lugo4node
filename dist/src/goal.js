"use strict";
exports.__esModule = true;
exports.Goal = void 0;
var Goal = /** @class */ (function () {
    /**
     *
     * @param place
     * @param center
     * @param topPole
     * @param bottomPole
     */
    function Goal(place, center, topPole, bottomPole) {
        this._center = center;
        this._place = place;
        this._topPole = topPole;
        this._bottomPole = bottomPole;
    }
    Goal.prototype.getCenter = function () {
        return this._center;
    };
    Goal.prototype.getPlace = function () {
        return this._place;
    };
    Goal.prototype.getTopPole = function () {
        return this._topPole;
    };
    Goal.prototype.getBottomPole = function () {
        return this._bottomPole;
    };
    return Goal;
}());
exports.Goal = Goal;
