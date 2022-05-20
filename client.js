'use strict';
const grpc = require("grpc");
const game_service = require("./pb/server_grpc_pb");
const game_msg = require("./pb/server_pb")


const PROTOCOL_VERSION = "1.0.0"

class Client {
    #serverAdd
    #token
    #teamSide
    #number
    #initPosition

    /**
     *
     * @param serverAdd {string}
     * @param token {string}
     * @param teamSide {number}
     * @param number {number}
     * @param initPosition {game_msg.lugo.Point}
     * @return {Promise<void>}
     */
    constructor(serverAdd, token, teamSide, number, initPosition) {
        this.#serverAdd = serverAdd
        this.#token = token
        this.#teamSide = teamSide
        this.#number = number
        this.#initPosition = initPosition

    }


    /**
     * 
     * @param {function(lugo.GameSnapshot):void} bot 
     */
    async play(bot) {
        await new Promise((resolve, reject) => {
            const client = new game_service.GameClient(this.#serverAdd, grpc.credentials.createInsecure())
            const deadline = new Date();

            deadline.setSeconds(deadline.getSeconds() + 5);
            client.waitForReady(deadline, (err) => {
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
                const running = client.joinATeam(req)

                running.on('data', function (response) {
                    if(response.getState() === game_msg.GameSnapshot.State.LISTENING) {
                        console.log("Playing!", response.getState() ,game_msg.GameSnapshot.State.LISTENING )
                        bot(response)
                    } else {
                        console.log("not playing", response.getState() ,game_msg.GameSnapshot.State.LISTENING )
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
}

module.exports.Client = Client