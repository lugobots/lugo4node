'use strict';
const game_msg = require("./pb/server_pb")
const field = require("./field")

class Point {
    x;
    y;

    constructor(x, y) {
        this.x = x
        this.y = y
    }

    proto() {
        const pos = new game_msg.Point();
        pos.setX(this.x)
        pos.setY(this.y)
        return pos
    }
}

module.exports.Point = Point