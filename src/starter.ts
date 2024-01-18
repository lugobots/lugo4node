import { Bot, NewClientFromConfig } from ".";
import { EnvVarLoader } from "./configurator";
import { Mapper } from "./mapper";

export const DEFAULT_PLAYER_POSITIONS = {
    1: {Col: 0, Row: 0},
    2: {Col: 1, Row: 1},
    3: {Col: 2, Row: 2},
    4: {Col: 2, Row: 3},
    5: {Col: 1, Row: 4},
    6: {Col: 3, Row: 1},
    7: {Col: 3, Row: 2},
    8: {Col: 3, Row: 3},
    9: {Col: 3, Row: 4},
    10: {Col: 4, Row: 3},
    11: {Col: 4, Row: 2},
}

export function NewDefaultStarter() {
	// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
	const config = new EnvVarLoader()

	// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
	const map = new Mapper(10, 6, config.getBotTeamSide())

	// our bot strategy defines our bot initial position based on its number
	const initialRegion = map.getRegion(DEFAULT_PLAYER_POSITIONS[config.getBotNumber()].Col, DEFAULT_PLAYER_POSITIONS[config.getBotNumber()].Row)

	// now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
  	// client constructor as well
	const lugoClient = NewClientFromConfig(config, initialRegion.getCenter())

	function playAsBot(bot: Bot) {
		lugoClient.playAsBot(bot).then(() => {
			console.log(`all done`)
		}).catch(e => {
			console.error(e)
		})
	}


	return { config, map, initialRegion, lugoClient, playAsBot }
}