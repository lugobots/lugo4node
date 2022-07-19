import * as Lugo from './pb/server_pb.js'
import {SPECS} from "./specs.js"

export class EnvVarLoader {

    /**
     * @type {string}
     */
    private readonly _grpcUrl: string

    /**
     * @type {boolean}
     */
    private readonly _grpcInsecure: boolean
    /**
     * @type {Lugo.Team.Side}
     */
    private readonly _botTeamSide: Lugo.Team.Side

    /**
     * @type {number}
     */
    private readonly _botNumber: number

    /**
     * @type {string}
     */
    private readonly _botToken: string

    constructor() {
        if (!process.env.BOT_TEAM) {
            throw new Error("missing BOT_TEAM env value")
        }

        if (!process.env.BOT_NUMBER) {
            throw new Error("missing BOT_NUMBER env value")
        }

        // the Lugo address
        this._grpcUrl = process.env.BOT_GRPC_URL || 'localhost:5000'
        this._grpcInsecure = Boolean((process.env.BOT_GRPC_INSECURE || "true").toLowerCase())

        // defining bot side
        this._botTeamSide = Lugo.Team.Side[process.env.BOT_TEAM.toUpperCase()]
        this._botNumber = parseInt(process.env.BOT_NUMBER)
        if (this._botNumber < 1 || this._botNumber > SPECS.MAX_PLAYERS) {
            throw new Error(`invalid bot number '${this._botNumber}', must be between 1 and ${SPECS.MAX_PLAYERS}`)
        }

        // the token is mandatory in official matches, but you may ignore in local games
        this._botToken = process.env.BOT_TOKEN || ""
    }

    getGrpcUrl(): string {
        return this._grpcUrl;
    }

    getGrpcInsecure(): boolean {
        return this._grpcInsecure;
    }

    getBotTeamSide(): Lugo.Team.Side {
        return this._botTeamSide;
    }

    getBotNumber(): number {
        return this._botNumber;
    }

    getBotToken(): string {
        return this._botToken;
    }
}

