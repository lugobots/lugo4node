import { Bot, NewClientFromConfig } from ".";
import { RawTurnProcessor } from "./client";
import { EnvVarLoader } from "./configurator";
import { Mapper } from "./mapper";
import { Point } from "./proto_exported";
import { DefaultInitBundle } from "./util/defaults";


export function NewDefaultStarter() {	
	const { defaultConfig, defaultMapper, defaultInitialPosition } = DefaultInitBundle();
	return new Starter(defaultInitialPosition, defaultConfig, defaultMapper);
}

class Starter {
	constructor(
		private initial_position: Point,
		private config: EnvVarLoader,
		private mapper: Mapper,
	) {}

	getMapper(): Mapper {
		return this.mapper;
	}

	setMapper(mapper: Mapper): void {
		this.mapper = mapper;
	}

	getInitialPosition(): Point {
		return this.initial_position
	}

	setInitialPosition(initial_position: Point): void {
		this.initial_position = initial_position;
	}

	getConfig(): EnvVarLoader {
		return this.config;
	}

	setConfig(config: EnvVarLoader): void {
		this.config = config;
	}

	run(bot: Bot, onJoin?: () => void){
		const lugoClient = NewClientFromConfig(this.config, this.initial_position)

		lugoClient.playAsBot(bot, onJoin).then(() => {
			console.log(`all done`)
		}).catch(e => {
			console.error(e)
		})
	}

	runJustTurnHandler(raw_processor: RawTurnProcessor, onJoin?: () => void) {
		const lugoClient = NewClientFromConfig(this.config, this.initial_position)

		lugoClient.play(raw_processor, onJoin).then(() => {
			console.log(`all done`)
		}).catch(e => {
			console.error(e)
		})
	}
}