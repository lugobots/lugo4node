"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.defineState = exports.DIRECTION = exports.DefaultInitBundle = exports.NewDefaultStarter = exports.subVector = exports.rl = exports.normalize = exports.getScaledVector = exports.getLength = exports.geo = exports.distanceBetweenPoints = exports.SPECS = exports.Region = exports.PLAYER_STATE = exports.ORIENTATION = exports.NewVector = exports.NewClientFromConfig = exports.Mapper = exports.Lugo = exports.Goal = exports.GameSnapshotInspector = exports.EnvVarLoader = exports.Client = void 0;
var client_1 = require("./client");
exports.Client = client_1.Client;
exports.NewClientFromConfig = client_1.NewClientFromConfig;
var configurator_1 = require("./configurator");
exports.EnvVarLoader = configurator_1.EnvVarLoader;
var game_snapshot_inspector_1 = require("./game-snapshot-inspector");
exports.GameSnapshotInspector = game_snapshot_inspector_1["default"];
var geo = require("./geo");
exports.geo = geo;
var geo_1 = require("./geo");
exports.NewVector = geo_1.NewVector;
exports.distanceBetweenPoints = geo_1.distanceBetweenPoints;
exports.getLength = geo_1.getLength;
exports.getScaledVector = geo_1.getScaledVector;
exports.normalize = geo_1.normalize;
exports.subVector = geo_1.subVector;
var goal_1 = require("./goal");
exports.Goal = goal_1.Goal;
var mapper_1 = require("./mapper");
exports.Mapper = mapper_1.Mapper;
exports.Region = mapper_1.Region;
var ORIENTATION = require("./orentation");
exports.ORIENTATION = ORIENTATION;
var Lugo = require("./proto_exported"); // keep for backward compatibility
exports.Lugo = Lugo;
__exportStar(require("./proto_exported"), exports);
var rl = require("./rl/index");
exports.rl = rl;
var specs_js_1 = require("./specs.js");
exports.SPECS = specs_js_1.SPECS;
var stub_1 = require("./stub");
exports.PLAYER_STATE = stub_1.PLAYER_STATE;
var starter_1 = require("./starter");
exports.NewDefaultStarter = starter_1.NewDefaultStarter;
var defaults_1 = require("./util/defaults");
exports.DefaultInitBundle = defaults_1.DefaultInitBundle;
var DIRECTION;
(function (DIRECTION) {
    DIRECTION[DIRECTION["FORWARD"] = 0] = "FORWARD";
    DIRECTION[DIRECTION["BACKWARD"] = 1] = "BACKWARD";
    DIRECTION[DIRECTION["LEFT"] = 2] = "LEFT";
    DIRECTION[DIRECTION["RIGHT"] = 3] = "RIGHT";
    DIRECTION[DIRECTION["BACKWARD_LEFT"] = 4] = "BACKWARD_LEFT";
    DIRECTION[DIRECTION["BACKWARD_RIGHT"] = 5] = "BACKWARD_RIGHT";
    DIRECTION[DIRECTION["FORWARD_LEFT"] = 6] = "FORWARD_LEFT";
    DIRECTION[DIRECTION["FORWARD_RIGHT"] = 7] = "FORWARD_RIGHT";
})(DIRECTION = exports.DIRECTION || (exports.DIRECTION = {}));
/**
 *
 * @param {GameSnapshotInspector}  snapshot
 * @param playerNumber
 * @param side
 * @returns {PLAYER_STATE}
 */
function defineState(snapshot, playerNumber, side) {
    if (!snapshot || !snapshot.getBall()) {
        throw new Error('invalid snapshot state - cannot define player state');
    }
    var me = snapshot.getPlayer(side, playerNumber);
    if (!me) {
        throw new Error('could not find the bot in the snapshot - cannot define player state');
    }
    var ballHolder = snapshot.getBall().getHolder();
    if (!ballHolder) {
        return stub_1.PLAYER_STATE.DISPUTING_THE_BALL;
    }
    else if (ballHolder.getTeamSide() === side) {
        if (ballHolder.getNumber() === playerNumber) {
            return stub_1.PLAYER_STATE.HOLDING_THE_BALL;
        }
        return stub_1.PLAYER_STATE.SUPPORTING;
    }
    return stub_1.PLAYER_STATE.DEFENDING;
}
exports.defineState = defineState;
