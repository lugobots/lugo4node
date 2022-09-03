const {Coach, delay} = require("./coach");
const {newZombiePlayer} = require("./zombie");


class Gym {

    #coach;

    #gameServerAddress;

    /**
     * @type {RemoteControl}
     */
    #remoteControl
    /**
     *
     * @param {RemoteControl} remoteControl
     * @param trainableBot
     * @param {function(CoachStub):Promise} trainingFunction
     */
    constructor(remoteControl, trainableBot, trainingFunction, options = {debugging_log: false}) {
        this.#remoteControl = remoteControl
        this.#coach = new Coach(remoteControl, trainableBot, trainingFunction)
        this.#coach.debugging_log = options.debugging_log
    }

    async start(lugoClient) {
        await lugoClient.setGettingReadyHandler((snapshot) => {
            return this.#coach.gettingReady(snapshot)
        }).play((orderSet, snapshot) => {
            return this.#coach.gameTurnHandler(orderSet, snapshot)
        }, async () => {
            if(this.#gameServerAddress) {
                await completeWithZombies(this.#gameServerAddress)
            }
            await this.#remoteControl.nextTurn()
        })
    }

    withZombiePlayers(gameServerAddress) {
        this.#gameServerAddress = gameServerAddress
        return this
    }
}

async function completeWithZombies(gameServerAddress) {
    for (let i = 1; i <= 11; i++) {
        await newZombiePlayer(proto.lugo.Team.Side.HOME, i, gameServerAddress)
        await newZombiePlayer(proto.lugo.Team.Side.AWAY, i, gameServerAddress)
    }
}

module.exports = {Gym}