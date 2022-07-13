import * as field from './field'
import * as lugo from './pb/server_pb'

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
     * @type {lugo.Team.Side}
     */
    private readonly _botTeamSide: lugo.Team.Side

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

        // the lugo address
        this._grpcUrl = process.env.BOT_GRPC_URL || 'localhost:5000'
        this._grpcInsecure = Boolean((process.env.BOT_GRPC_INSECURE || "true").toLowerCase())

        // defining bot side
        this._botTeamSide = lugo.Team.Side[process.env.BOT_TEAM.toUpperCase()]
        this._botNumber = parseInt(process.env.BOT_NUMBER)
        if (this._botNumber < 1 || this._botNumber > field.MAX_PLAYERS) {
            throw new Error(`invalid bot number '${this._botNumber}', must be between 1 and ${field.MAX_PLAYERS}`)
        }

        // the token is mandatory in official matches, but you may ignore in local games
        this._botToken = process.env.BOT_TOKEN || ""
    }

    get grpcUrl(): string {
        return this._grpcUrl;
    }

    get grpcInsecure(): boolean {
        return this._grpcInsecure;
    }

    get botTeamSide(): lugo.Team.Side {
        return this._botTeamSide;
    }

    get botNumber(): number {
        return this._botNumber;
    }

    get botToken(): string {
        return this._botToken;
    }
}
