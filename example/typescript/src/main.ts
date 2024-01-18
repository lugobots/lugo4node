import { NewDefaultStarter } from '@lugobots/lugo4node'
import { MyBot } from './myBot.js'

const { config, map, initialRegion, playAsBot } = NewDefaultStarter()

playAsBot(new MyBot(
  config.getBotTeamSide(),
  config.getBotNumber(),
  initialRegion.getCenter(),
  map,
));

