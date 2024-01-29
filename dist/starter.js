"use strict";
exports.__esModule = true;
exports.NewDefaultStarter = void 0;
var _1 = require(".");
var defaults_1 = require("./util/defaults");
function NewDefaultStarter() {
    var _a = (0, defaults_1.DefaultInitBundle)(), defaultConfig = _a.defaultConfig, defaultMapper = _a.defaultMapper, defaultInitialPosition = _a.defaultInitialPosition;
    return new Starter(defaultInitialPosition, defaultConfig, defaultMapper);
}
exports.NewDefaultStarter = NewDefaultStarter;
var Starter = /** @class */ (function () {
    function Starter(initial_position, config, mapper) {
        this.initial_position = initial_position;
        this.config = config;
        this.mapper = mapper;
    }
    Starter.prototype.getMapper = function () {
        return this.mapper;
    };
    Starter.prototype.setMapper = function (mapper) {
        this.mapper = mapper;
    };
    Starter.prototype.getInitialPosition = function () {
        return this.initial_position;
    };
    Starter.prototype.setInitialPosition = function (initial_position) {
        this.initial_position = initial_position;
    };
    Starter.prototype.getConfig = function () {
        return this.config;
    };
    Starter.prototype.setConfig = function (config) {
        this.config = config;
    };
    Starter.prototype.run = function (bot, onJoin) {
        var lugoClient = (0, _1.NewClientFromConfig)(this.config, this.initial_position);
        lugoClient.playAsBot(bot, onJoin).then(function () {
            console.log("all done");
        })["catch"](function (e) {
            console.error(e);
        });
    };
    Starter.prototype.runJustTurnHandler = function (raw_processor, onJoin) {
        var lugoClient = (0, _1.NewClientFromConfig)(this.config, this.initial_position);
        lugoClient.play(raw_processor, onJoin).then(function () {
            console.log("all done");
        })["catch"](function (e) {
            console.error(e);
        });
    };
    return Starter;
}());
