import { EnvVarLoader } from "../configurator"
import { Mapper } from "../mapper"
import { Point } from "../proto_exported";

export function DefaultInitBundle(): {
    defaultConfig: EnvVarLoader;
    defaultMapper: Mapper;
    defaultInitialPosition: Point;
} {
	// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
	const defaultConfig = new EnvVarLoader()

	// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
	const defaultMapper = new Mapper(10, 6, defaultConfig.getBotTeamSide())

	// our bot strategy defines our bot initial position based on its number
	const initialRegion = defaultMapper.getRegion(DEFAULT_PLAYER_POSITIONS[defaultConfig.getBotNumber()].Col, DEFAULT_PLAYER_POSITIONS[defaultConfig.getBotNumber()].Row)

	const defaultInitialPosition = initialRegion.getCenter();

	return { defaultConfig, defaultMapper, defaultInitialPosition }
}

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