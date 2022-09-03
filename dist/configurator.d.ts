import * as Lugo from './pb/server_pb.js';
export declare class EnvVarLoader {
    /**
     * @type {string}
     */
    private readonly _grpcUrl;
    /**
     * @type {boolean}
     */
    private readonly _grpcInsecure;
    /**
     * @type {Lugo.Team.Side}
     */
    private readonly _botTeamSide;
    /**
     * @type {number}
     */
    private readonly _botNumber;
    /**
     * @type {string}
     */
    private readonly _botToken;
    constructor();
    getGrpcUrl(): string;
    getGrpcInsecure(): boolean;
    getBotTeamSide(): Lugo.Team.Side;
    getBotNumber(): number;
    getBotToken(): string;
}
