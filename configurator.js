'use strict';
require('./pb/server_pb')
const field = require('./field')

class EnvVarLoader {
    /**
     * @type {string}
     */
    #_grpcUrl

    /**
     * @type {boolean}
     */
    #_grpcInsecure
    /**
     * @type {proto.lugo.Team.Side}
     */
    #_botTeam

    /**
     * @type {number}
     */
    #_botNumber

    /**
     * @type {string}
     */
    #_botToken

    constructor() {
        if (!process.env.BOT_TEAM) {
            throw new Error("missing BOT_TEAM env value")
        }

        if (!process.env.BOT_NUMBER) {
            throw new Error("missing BOT_NUMBER env value")
        }

        // the server address
        this.#_grpcUrl = process.env.BOT_GRPC_URL || 'localhost:5000'
        this.#_grpcInsecure = Boolean((process.env.BOT_GRPC_INSECURE || "true").toLowerCase())

        // defining bot side
        this.#_botTeam = proto.lugo.Team.Side[process.env.BOT_TEAM.toUpperCase()]
        this.#_botNumber = parseInt(process.env.BOT_NUMBER)
        if(this.#_botNumber < 1 || this.#_botNumber > field.MAX_PLAYERS) {
            throw new Error(`invalid bot number '${this.#_botNumber}', must be between 1 and ${field.MAX_PLAYERS}`)
        }

        // the token is mandatory in official matches, but you may ignore in local games
        this.#_botToken = process.env.BOT_TOKEN || ""
    }

    /**
     *
     * @returns {string}
     */
    get grpcUrl() {
        return this.#_grpcUrl;
    }

    /**
     *
     * @returns {boolean}
     */
    get grpcInsecure() {
        return this.#_grpcInsecure;
    }

    /**
     *
     * @returns {proto.lugo.Team.Side}
     */
    get botTeam() {
        return this.#_botTeam;
    }

    /**
     *
     * @returns {number}
     */
    get botNumber() {
        return this.#_botNumber;
    }

    /**
     *
     * @returns {string}
     */
    get botToken() {
        return this.#_botToken;
    }
}

module.exports = EnvVarLoader