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
exports.State = exports.Side = void 0;
// exposing all from server
var server_pb_1 = require("./pb/server_pb");
__exportStar(require("./pb/server_pb.js"), exports);
exports.Side = server_pb_1.Team.Side;
exports.State = server_pb_1.GameSnapshot.State;
// exposing all from broadcast
__exportStar(require("./pb/broadcast_pb.js"), exports);
__exportStar(require("./pb/remote_pb.js"), exports);
// exposing all from physics
__exportStar(require("./pb/physics_pb.js"), exports);
__exportStar(require("./pb/broadcast_grpc_pb.js"), exports);
__exportStar(require("./pb/remote_grpc_pb.js"), exports);
__exportStar(require("./pb/server_grpc_pb"), exports);
