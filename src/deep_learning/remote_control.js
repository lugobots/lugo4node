`use strict`;
const grpc = require("@grpc/grpc-js");
const remote = require("../pb/remote_grpc_pb")
require("../pb/server_pb")

class RemoteControl {
    #client;

    constructor() {

    }

    async connect(grpcAddress) {
        await new Promise((resolve, reject) => {
            this.#client = new remote.RemoteClient(grpcAddress, grpc.credentials.createInsecure())
            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + 5);
            this.#client.waitForReady(deadline, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    async pauseResume() {
        const pauseReq = new proto.lugo.PauseResumeRequest()
        return new Promise((resolve, reject) => {
            const resp = this.#client.pauseOrResume(pauseReq, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    async nextTurn() {
        const nextTurnReq = new proto.lugo.NextTurnRequest()
        return new Promise((resolve, reject) => {
            const resp = this.#client.nextTurn(nextTurnReq, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    /**
     *
     * @param {proto.lugo.Point} position
     * @param {proto.lugo.Velocity} velocity
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    async setBallProps(position, velocity) {
        const ballPropReq = new proto.lugo.BallProperties()
        ballPropReq.setVelocity(velocity)
        ballPropReq.setPosition(position)
        return new Promise((resolve, reject) => {
            const resp = this.#client.setBallProperties(ballPropReq, (err, commandResponsee) => {
                if (err) {
                    reject(err)
                }
                resolve(commandResponsee.getGameSnapshot())
            })
        })
    }

    async setPlayerProps(teamSide, playerNumber, newPosition, newVelocity) {
        const playerProperties = new proto.lugo.PlayerProperties()
        playerProperties.setVelocity(newVelocity)
        playerProperties.setPosition(newPosition)
        playerProperties.setSide(teamSide)
        playerProperties.setNumber(playerNumber)
        return new Promise((resolve, reject) => {
            const resp = this.#client.setPlayerProperties(playerProperties, (err, commandResponsee) => {
                if (err) {
                    reject(err)
                }
                resolve(commandResponsee.getGameSnapshot())
            })
        })
    }

    async setTurn(turnNumber) {
        const gameProp = new proto.lugo.GameProperties()
        gameProp.setTurn(turnNumber)
        return new Promise((resolve, reject) => {
            const resp = this.#client.setGameProperties(gameProp, (err, commandResponsee) => {
                if (err) {
                    reject(err)
                }
                resolve(commandResponsee.getGameSnapshot())
            })
        })

    }
}

module.exports = {RemoteControl}