import { Bot } from ".";
import { EnvVarLoader } from "./configurator";
import { Mapper } from "./mapper";
export declare const DEFAULT_PLAYER_POSITIONS: {
    1: {
        Col: number;
        Row: number;
    };
    2: {
        Col: number;
        Row: number;
    };
    3: {
        Col: number;
        Row: number;
    };
    4: {
        Col: number;
        Row: number;
    };
    5: {
        Col: number;
        Row: number;
    };
    6: {
        Col: number;
        Row: number;
    };
    7: {
        Col: number;
        Row: number;
    };
    8: {
        Col: number;
        Row: number;
    };
    9: {
        Col: number;
        Row: number;
    };
    10: {
        Col: number;
        Row: number;
    };
    11: {
        Col: number;
        Row: number;
    };
};
export declare function NewDefaultStarter(): {
    config: EnvVarLoader;
    map: Mapper;
    initialRegion: import("./mapper").Region;
    lugoClient: import("./client").Client;
    playAsBot: (bot: Bot) => void;
};
