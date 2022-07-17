"use strict";
exports.__esModule = true;
exports.EnvVarLoader = void 0;
var lugo = require("./pb/server_pb.js");
var specs_js_1 = require("./specs.js");
var EnvVarLoader = /** @class */ (function () {
    function EnvVarLoader() {
        if (!process.env.BOT_TEAM) {
            throw new Error("missing BOT_TEAM env value");
        }
        if (!process.env.BOT_NUMBER) {
            throw new Error("missing BOT_NUMBER env value");
        }
        // the lugo address
        this._grpcUrl = process.env.BOT_GRPC_URL || 'localhost:5000';
        this._grpcInsecure = Boolean((process.env.BOT_GRPC_INSECURE || "true").toLowerCase());
        // defining bot side
        this._botTeamSide = lugo.Team.Side[process.env.BOT_TEAM.toUpperCase()];
        this._botNumber = parseInt(process.env.BOT_NUMBER);
        if (this._botNumber < 1 || this._botNumber > specs_js_1.SPECS.MAX_PLAYERS) {
            throw new Error("invalid bot number '".concat(this._botNumber, "', must be between 1 and ").concat(specs_js_1.SPECS.MAX_PLAYERS));
        }
        // the token is mandatory in official matches, but you may ignore in local games
        this._botToken = process.env.BOT_TOKEN || "";
    }
    EnvVarLoader.prototype.getGrpcUrl = function () {
        return this._grpcUrl;
    };
    EnvVarLoader.prototype.getGrpcInsecure = function () {
        return this._grpcInsecure;
    };
    EnvVarLoader.prototype.getBotTeamSide = function () {
        return this._botTeamSide;
    };
    EnvVarLoader.prototype.getBotNumber = function () {
        return this._botNumber;
    };
    EnvVarLoader.prototype.getBotToken = function () {
        return this._botToken;
    };
    return EnvVarLoader;
}());
exports.EnvVarLoader = EnvVarLoader;
