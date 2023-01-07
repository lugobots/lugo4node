import {DIRECTION, GameSnapshotReader, Lugo, Mapper, SPECS, ORIENTATION, rl} from "@lugobots/lugo4node";
import * as tf from "@tensorflow/tfjs-node";

const ACTIONS = [
    DIRECTION.FORWARD,
    DIRECTION.BACKWARD,
    DIRECTION.LEFT,
    DIRECTION.RIGHT,
    DIRECTION.FORWARD_RIGHT,
    DIRECTION.FORWARD_LEFT,
    DIRECTION.BACKWARD_RIGHT,
    DIRECTION.BACKWARD_LEFT,
]

export class MyTrainableBot implements rl.TrainableBot {

    private remoteControl: rl.RemoteControl;

    private mapper: Mapper;

    constructor(remoteControl: rl.RemoteControl) {
        this.remoteControl = remoteControl
    }

    async createNewInitialState(): Promise<Lugo.GameSnapshot> {
        this.mapper = new Mapper(20, 20, Lugo.Team.Side.HOME)
        for (let i = 1; i <= 11; i++) {
            await this._randomPlayerPos(this.mapper, Lugo.Team.Side.HOME, i)
            await this._randomPlayerPos(this.mapper, Lugo.Team.Side.AWAY, i)
        }

        const randomVelocity = new Lugo.Velocity()
        randomVelocity.setSpeed(0)
        randomVelocity.setDirection(ORIENTATION.NORTH)// irrelevant
        await this.remoteControl.setPlayerProps(
            Lugo.Team.Side.HOME,
            5,
            this.mapper.getRegion(10, randomInteger(7, 13)).getCenter(),
            randomVelocity)

        const ballPos = new Lugo.Point()
        ballPos.setX(0)
        ballPos.setY(0)
        const newVelocity = new Lugo.Velocity()
        newVelocity.setSpeed(0)
        newVelocity.setDirection(ORIENTATION.NORTH)// irrelevant

        await this.remoteControl.setTurn(1)
        return await this.remoteControl.setBallProps(ballPos, newVelocity)
    }

    async getInputs(snapshot: Lugo.GameSnapshot): Promise<any> {
        const reader = new GameSnapshotReader(snapshot, Lugo.Team.Side.HOME)
        const me = reader.getPlayer(Lugo.Team.Side.HOME, 5)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        const mappedOpponents = this._findOpponent(reader)
        const myPosition = this.mapper.getRegionFromPoint(me.getPosition())

        let sensorFront = 0
        if (this._hasOpponent(mappedOpponents, myPosition.front())) {
            sensorFront = 2
        } else if (this._hasOpponent(mappedOpponents, myPosition.front().front())) {
            sensorFront = 1
        } else if (this._hasOpponent(mappedOpponents, myPosition.front().left()) || this._hasOpponent(mappedOpponents, myPosition.front().right())) {
            sensorFront = 1
        }
        let sensorLeft = 0
        if (this._hasOpponent(mappedOpponents, myPosition.left())) {
            sensorLeft = 2
        } else if (this._hasOpponent(mappedOpponents, myPosition.left().left())) {
            sensorLeft = 1
        }

        let sensorRight = 0
        if (this._hasOpponent(mappedOpponents, myPosition.right())) {
            sensorRight = 2
        } else if (this._hasOpponent(mappedOpponents, myPosition.right().right())) {
            sensorRight = 1
        }

        // console.log(`Sensorres: `, [sensorFront, sensorLeft, sensorRight])
        return tf.tensor2d([[sensorFront, sensorLeft, sensorRight]]);
    }

    async play(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot, action: any): Promise<Lugo.OrderSet> {
        const reader = new GameSnapshotReader(snapshot, Lugo.Team.Side.HOME)
        const me = reader.getPlayer(Lugo.Team.Side.HOME, 5)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        // .argMax(-1).dataSync()

        // console.log(action)
        const interval = 1 / 8;
        // action = action.argMax(-1).dataSync()
        //  console.log(`action: `, action)

        const dir = reader.makeOrderMoveByDirection(action)
        // await delay(3000)
        return orderSet.setOrdersList([dir])
    }

    /**
     *
     * @param {Lugo.GameSnapshot} previousSnapshot
     * @param {Lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    async evaluate(previousSnapshot, newSnapshot) {
        const readerPrevious = new GameSnapshotReader(previousSnapshot, Lugo.Team.Side.HOME)
        const reader = new GameSnapshotReader(newSnapshot, Lugo.Team.Side.HOME)
        const me = reader.getPlayer(Lugo.Team.Side.HOME, 5)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        const mePreviously = readerPrevious.getPlayer(Lugo.Team.Side.HOME, 5)
        if (!mePreviously) {
            throw new Error("did not find myself in the game")
        }

        const mappedOpponents = this._findOpponent(reader)
        const opponentGoal = reader.getOpponentGoal().getCenter()

        const previousDist = Math.hypot(opponentGoal.getX() - mePreviously.getPosition().getX(),
            opponentGoal.getY() - mePreviously.getPosition().getY())

        const actualDist = Math.hypot(opponentGoal.getX() - me.getPosition().getX(),
            opponentGoal.getY() - me.getPosition().getY())

        const myPosition = this.mapper.getRegionFromPoint(me.getPosition())
        let reward = 0;
        // if ( actualDist < previousDist) {
        reward = (previousDist - actualDist) / SPECS.PLAYER_MAX_SPEED
        // }
        let done = false

        if (this._hasOpponent(mappedOpponents, myPosition.left()) ||
            this._hasOpponent(mappedOpponents, myPosition.right()) ||
            this._hasOpponent(mappedOpponents, myPosition.front()) ||
            this._hasOpponent(mappedOpponents, myPosition)) {
            done = true
            reward = -2
            // console.log(`Done because got to close to an opponent`)
        } else if (mePreviously.getPosition().getX() > SPECS.MAX_X_COORDINATE * 0.9) {
            done = true
            // console.log(`Done because it is too far ${mePreviously.getPosition().getX()}`)
        }
        // console.log(`Reward : `, reward)
        return {done, reward}
    }

    async _randomPlayerPos(mapper, side, number) {
        const minCol = 10
        const maxCol = 17
        const minRow = 4
        const maxRow = 16

        const randomVelocity = new Lugo.Velocity()
        randomVelocity.setSpeed(0)
        randomVelocity.setDirection(ORIENTATION.NORTH)// irrelevant

        const randomCol = randomInteger(minCol, maxCol)
        const randomRow = randomInteger(minRow, maxRow)
        const randomPosition = mapper.getRegion(randomCol, randomRow).getCenter()
        await this.remoteControl.setPlayerProps(side, number, randomPosition, randomVelocity)
    }

    /**
     *
     * @param {GameSnapshotReader} reader
     * @private
     */
    _findOpponent(reader) {
        const getOpponents = reader.getTeam(reader.getOpponentSide()).getPlayersList()
        const mappedOpponents = []
        for (const opponent of getOpponents) {
            const opponentRegion = this.mapper.getRegionFromPoint(opponent.getPosition())
            if (mappedOpponents[opponentRegion.getCol()] === undefined) {
                mappedOpponents[opponentRegion.getCol()] = []
            }
            mappedOpponents[opponentRegion.getCol()][opponentRegion.getRow()] = true
        }
        return mappedOpponents
    }

    /**
     *
     * @param mappedOpponents
     * @param {Region} region
     * @returns {boolean}
     * @private
     */
    _hasOpponent(mappedOpponents, region) {
        return mappedOpponents[region.getCol()] !== undefined && mappedOpponents[region.getCol()][region.getRow()] === true
    }
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
