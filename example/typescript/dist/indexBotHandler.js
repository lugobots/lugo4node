"use strict";
exports.__esModule = true;
var lugo4node_1 = require("@lugobots/lugo4node");
var myBot_js_1 = require("./myBot.js");
// we must load the env vars following the standard defined by the game specs because all bots will receive the
// arguments in the same format (env vars)
var config = new lugo4node_1.EnvVarLoader();
// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
var map = new lugo4node_1.Mapper(10, 6, config.getBotTeamSide());
// our bot strategy defines our bot initial position based on its number
var initialRegion = map.getRegion(myBot_js_1.PLAYER_POSITIONS[config.getBotNumber()].Col, myBot_js_1.PLAYER_POSITIONS[config.getBotNumber()].Row);
// now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
// client constructor as well
var lugoClient = (0, lugo4node_1.NewClientFromConfig)(config, initialRegion.getCenter());
var myBot = new myBot_js_1.MyBot(config.getBotTeamSide(), config.getBotNumber(), initialRegion.getCenter(), map);
lugoClient.playAsBot(myBot).then(function () {
    console.log("all done");
})["catch"](function (e) {
    console.error(e);
});
