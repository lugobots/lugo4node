"use strict";
exports.__esModule = true;
exports.SOUTH_WEST = exports.SOUTH_EAST = exports.NORTH_WEST = exports.NORTH_EAST = exports.NORTH = exports.SOUTH = exports.WEST = exports.EAST = void 0;
var physics_pb_js_1 = require("./pb/physics_pb.js");
var vectors = require("./vector.js");
exports.EAST = vectors.normalize(new physics_pb_js_1.Vector().setX(1));
exports.WEST = vectors.normalize(new physics_pb_js_1.Vector().setX(-1));
exports.SOUTH = vectors.normalize(new physics_pb_js_1.Vector().setY(-1));
exports.NORTH = vectors.normalize(new physics_pb_js_1.Vector().setY(1));
exports.NORTH_EAST = vectors.normalize(new physics_pb_js_1.Vector().setX(1).setY(1));
exports.NORTH_WEST = vectors.normalize(new physics_pb_js_1.Vector().setX(-1).setY(1));
exports.SOUTH_EAST = vectors.normalize(new physics_pb_js_1.Vector().setX(1).setY(-1));
exports.SOUTH_WEST = vectors.normalize(new physics_pb_js_1.Vector().setX(-1).setY(-1));