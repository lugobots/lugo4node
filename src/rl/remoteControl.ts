`use strict`;
import * as grpc from "@grpc/grpc-js";
import * as remote from "../pb/remote_grpc_pb"
import {
    PauseResumeRequest,
    BallProperties,
    NextTurnRequest,
    PlayerProperties,
    GameProperties,
    ResumeListeningRequest
} from "../pb/remote_pb"
import {Point, Velocity} from "../pb/physics_pb"
import {GameSnapshot, Team} from "../pb/server_pb"


export class RemoteControl {
    private client: remote.RemoteClient;

    constructor() {

    }

    async connect(grpcAddress: string): Promise<void> {
        await new Promise<void>((resolve, reject) => {
            this.client = new remote.RemoteClient(grpcAddress, grpc.credentials.createInsecure())
            const deadline = new Date();
            deadline.setSeconds(deadline.getSeconds() + 5);
            this.client.waitForReady(deadline, (err) => {
                if (err) {
                    reject(err)
                } else {
                    resolve()
                }
            })
        })
    }

    async pauseResume(): Promise<void> {
        const pauseReq = new PauseResumeRequest()
        return new Promise<void>((resolve, reject) => {
            const resp = this.client.pauseOrResume(pauseReq, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    async resumeListening(): Promise<void> {
        const req = new ResumeListeningRequest()
        return new Promise<void>((resolve, reject) => {
            const resp = this.client.resumeListeningPhase(req, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    async nextTurn(): Promise<void> {
        const nextTurnReq = new NextTurnRequest();
        return new Promise<void>((resolve, reject) => {
            const resp = this.client.nextTurn(nextTurnReq, (err) => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })
    }

    async setBallProps(position: Point, velocity: Velocity): Promise<GameSnapshot> {
        const ballPropReq = new BallProperties()
        ballPropReq.setVelocity(velocity)
        ballPropReq.setPosition(position)
        return new Promise<GameSnapshot>((resolve, reject) => {
            const resp = this.client.setBallProperties(ballPropReq, (err, commandResponse) => {
                if (err) {
                    reject(err)
                }
                resolve(commandResponse.getGameSnapshot())
            })
        })
    }

    async setPlayerProps(teamSide: Team.Side, playerNumber: number, newPosition: Point, newVelocity: Velocity): Promise<GameSnapshot> {
        const playerProperties = new PlayerProperties()
        playerProperties.setVelocity(newVelocity)
        playerProperties.setPosition(newPosition)
        playerProperties.setSide(teamSide)
        playerProperties.setNumber(playerNumber)
        return new Promise<GameSnapshot>((resolve, reject) => {
            const resp = this.client.setPlayerProperties(playerProperties, (err, commandResponse) => {
                if (err) {
                    reject(err)
                }
                resolve(commandResponse.getGameSnapshot())
            })
        })
    }

    async setTurn(turnNumber): Promise<GameSnapshot> {
        const gameProp = new GameProperties()
        gameProp.setTurn(turnNumber)
        return new Promise<GameSnapshot>((resolve, reject) => {
            const resp = this.client.setGameProperties(gameProp, (err, commandResponse) => {
                if (err) {
                    reject(err)
                }
                resolve(commandResponse.getGameSnapshot())
            })
        })

    }
}