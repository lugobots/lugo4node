'use strict';
const grpc = require("grpc");
const game_service = require("./pb/server_grpc_pb");
require("./pb/server_pb")
const game_msg = require("./pb/server_pb")


const PROTOCOL_VERSION = "1.0.0"

class Client {
    #serverAdd
    #token
    #teamSide
    #number
    /**
     * @type {proto.lugo.Point}
     */
    #initPosition

    #client;

    /**
     *
     * @param serverAdd {string}
     * @param token {string}
     * @param teamSide {number}
     * @param number {number}
     * @param initPosition {proto.lugo.Point}
     * @return {Promise<void>}
     */
    constructor(serverAdd, token, teamSide, number, initPosition) {
        this.#serverAdd = serverAdd
        this.#token = token
        this.#teamSide = teamSide
        this.#number = number
        this.#initPosition = initPosition
        console.log(`Chegou ${this.#initPosition.getX()}x${this.#initPosition.getY()}`)
    }


    /**
     *
     * @param {function(lugo.GameSnapshot, Client):void} bot
     */
    async play(bot) {
        await new Promise((resolve, reject) => {
            this.#client = new game_service.GameClient(this.#serverAdd, grpc.credentials.createInsecure())
            const deadline = new Date();

            deadline.setSeconds(deadline.getSeconds() + 5);
            this.#client.waitForReady(deadline, (err) => {
                if (err) {
                    reject(new Error(`failed to connect to the Game Server: ${err}`))
                }
                console.log(`connect to the gRPC server`)

                const req = new game_msg.JoinRequest()
                req.setToken(this.#token)
                req.setProtocolVersion(PROTOCOL_VERSION)
                req.setTeamSide(this.#teamSide)
                req.setNumber(this.#number)
                req.setInitPosition(this.#initPosition)
                const running = this.#client.joinATeam(req)

                console.log(`Ini position: ${this.#initPosition.getX()}x${this.#initPosition.getY()}`)

                running.on('data', (response) => {
                    if (response.getState() === game_msg.GameSnapshot.State.LISTENING) {
                        console.log("Playing!", response.getState(), game_msg.GameSnapshot.State.LISTENING)
                        bot(response, this)
                    } else {
                        console.log("not playing", response.getState(), game_msg.GameSnapshot.State.LISTENING)
                    }
                });
                running.on('status', function (status) {
                    // process status
                    console.log('status', status);
                });

                running.on('error', function (e) {
                    reject(new Error(`error on team connection: ${e}`))
                });
                running.on('end', function () {
                    console.log('communication done');
                    resolve()
                });
            })
        })
    }

    /**
     *
     * @param {proto.lugo.OrderSet} orderSet
     * @param {game_service.GameClient} connection
     */
    orderSetSender(orderSet) {
        /** @type {module:grpc.ClientUnaryCall} response */
        const response = this.#client.sendOrders(orderSet, (res) => {
            console.log(`Eu odeio JS`, res)
        })

        console.log(response.getPeer())
    }
}

module.exports.Client = Client