import { RawTurnProcessor } from '../client';
export declare function newRandomMotionHelperPlayer(teamSide: any, playerNumber: any, gameServerAddress: any, turnsToChangeDirection?: number): Promise<void>;
export declare function newChaserHelperPlayer(teamSide: any, playerNumber: any, gameServerAddress: any): Promise<void>;
export declare function newZombieHelperPlayer(teamSide: any, playerNumber: any, gameServerAddress: any): Promise<void>;
export declare function newCustomHelperPlayer(teamSide: any, playerNumber: any, gameServerAddress: any, turnHandler: RawTurnProcessor): Promise<void>;
