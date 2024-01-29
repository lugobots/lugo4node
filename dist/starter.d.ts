import { Bot } from ".";
import { RawTurnProcessor } from "./client";
import { EnvVarLoader } from "./configurator";
import { Mapper } from "./mapper";
import { Point } from "./proto_exported";
export declare function NewDefaultStarter(): Starter;
declare class Starter {
    private initial_position;
    private config;
    private mapper;
    constructor(initial_position: Point, config: EnvVarLoader, mapper: Mapper);
    getMapper(): Mapper;
    setMapper(mapper: Mapper): void;
    getInitialPosition(): Point;
    setInitialPosition(initial_position: Point): void;
    getConfig(): EnvVarLoader;
    setConfig(config: EnvVarLoader): void;
    run(bot: Bot, onJoin?: () => void): void;
    runJustTurnHandler(raw_processor: RawTurnProcessor, onJoin?: () => void): void;
}
export {};
