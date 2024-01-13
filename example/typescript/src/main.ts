import { EnvVarLoader, Mapper, NewClientFromConfig } from '@lugobots/lugo4node'
import { MyBot, PLAYER_POSITIONS } from './myBot.js'

// we must load the env vars following the standard defined by the game specs because all bots will receive the
// arguments in the same format (env vars)
const config = new EnvVarLoader()

// the map will help us to see the field in quadrants (called regions) instead of working with coordinates
const map = new Mapper(10, 6, config.getBotTeamSide())

// our bot strategy defines our bot initial position based on its number
const initialRegion = map.getRegion(PLAYER_POSITIONS[config.getBotNumber()].Col, PLAYER_POSITIONS[config.getBotNumber()].Row)

// now we can create the bot. We will use a shortcut to create the client from the config, but we could use the
// client constructor as well
const lugoClient = NewClientFromConfig(config, initialRegion.getCenter())

const myBot = new MyBot(
  config.getBotTeamSide(),
  config.getBotNumber(),
  initialRegion.getCenter(),
  map,
)

lugoClient.playAsBot(myBot).then(() => {
    console.log(`all done`)
}).catch(e => {
    console.error(e)
})

