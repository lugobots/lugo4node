import * as lugo from './pb/server_pb';
import { SPECS } from "./specs";
export class EnvVarLoader {
    constructor() {
        if (!process.env.BOT_TEAM) {
            throw new Error("missing BOT_TEAM env value");
        }
        if (!process.env.BOT_NUMBER) {
            throw new Error("missing BOT_NUMBER env value");
        }
        // the lugo address
        this._grpcUrl = process.env.BOT_GRPC_URL || 'localhost:5000';
        this._grpcInsecure = Boolean((process.env.BOT_GRPC_INSECURE || "true").toLowerCase());
        // defining bot side
        this._botTeamSide = lugo.Team.Side[process.env.BOT_TEAM.toUpperCase()];
        this._botNumber = parseInt(process.env.BOT_NUMBER);
        if (this._botNumber < 1 || this._botNumber > SPECS.MAX_PLAYERS) {
            throw new Error(`invalid bot number '${this._botNumber}', must be between 1 and ${SPECS.MAX_PLAYERS}`);
        }
        // the token is mandatory in official matches, but you may ignore in local games
        this._botToken = process.env.BOT_TOKEN || "";
    }
    get grpcUrl() {
        return this._grpcUrl;
    }
    get grpcInsecure() {
        return this._grpcInsecure;
    }
    get botTeamSide() {
        return this._botTeamSide;
    }
    get botNumber() {
        return this._botNumber;
    }
    get botToken() {
        return this._botToken;
    }
}
