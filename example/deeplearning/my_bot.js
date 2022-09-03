const {homeGoal, FIELD, directions, vectors, GameSnapshotReader, deep_learning, Mapper} = require("lugo4node");
const tf = require("@tensorflow/tfjs-node");
const {delay} = require("../../src/deep_learning/coach");


const ALL_FORWARD = 0;
const ALL_BACKWARD = 1;
const ALL_LEFT = 2;
const ALL_RIGHT = 3;
const ALL_FORWARD_RIGHT = 4;
const ALL_FORWARD_LEFT = 5;
const ALL_BACKWARD_RIGHT = 6;
const ALL_BACKWARD_LEFT = 7;

const ACTIONS = [
    ALL_FORWARD,
    ALL_BACKWARD,
    ALL_LEFT,
    ALL_RIGHT,
    ALL_FORWARD_RIGHT,
    ALL_FORWARD_LEFT,
    ALL_BACKWARD_RIGHT,
    ALL_BACKWARD_LEFT,
]

class MyTrainableBot extends deep_learning.TrainableBotStub {
    /**
     * @type {RemoteControl}
     */
    #remoteControl;

    /**
     * @type {Mapper}
     */
    #mapper;

    /**
     *
     * @param {RemoteControl} remoteControl
     */
    constructor(remoteControl) {
        super()
        this.#remoteControl = remoteControl
    }

    /**
     *
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    async createNewInitialState() {
        this.#mapper = new Mapper(20, 20, proto.lugo.Team.Side.HOME)
        for (let i = 1; i <= 11; i++) {
            await this._randomPlayerPos(this.#mapper, proto.lugo.Team.Side.HOME, i)
            await this._randomPlayerPos(this.#mapper, proto.lugo.Team.Side.AWAY, i)
        }

        const randomVelocity = new proto.lugo.Velocity()
        randomVelocity.setSpeed(0)
        randomVelocity.setDirection(directions.North)// irrelevant
        await this.#remoteControl.setPlayerProps(
            proto.lugo.Team.Side.HOME,
            5,
            this.#mapper.getRegion(10, randomInteger(7, 13)).getCenter(),
            randomVelocity)

        const ballPos = new proto.lugo.Point()
        ballPos.setX(0)
        ballPos.setY(0)
        const newVelocity = new proto.lugo.Velocity()
        newVelocity.setSpeed(0)
        newVelocity.setDirection(directions.North)// irrelevant

        await this.#remoteControl.setTurn(1)
        return await this.#remoteControl.setBallProps(ballPos, newVelocity)
    }

    /**
     *
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {Promise<Tensor>}
     */
    async getInputs(snapshot) {
        const reader = new GameSnapshotReader(snapshot, proto.lugo.Team.Side.HOME)
        const me = reader.getPlayer(proto.lugo.Team.Side.HOME, 5)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        const mappedOpponents = this._findOpponent(reader)
        const myPosition = this.#mapper.getRegionFromPoint(me.getPosition())

        let sensorFront = 0
        if(this._hasOpponent(mappedOpponents, myPosition.front())) {
            sensorFront = 2
        }else if(this._hasOpponent(mappedOpponents, myPosition.front().front())) {
            sensorFront = 1
        } else if(this._hasOpponent(mappedOpponents, myPosition.front().left()) || this._hasOpponent(mappedOpponents, myPosition.front().right())) {
            sensorFront = 1
        }
        let sensorLeft = 0
        if(this._hasOpponent(mappedOpponents, myPosition.left())) {
            sensorLeft = 2
        } else if (this._hasOpponent(mappedOpponents, myPosition.left().left())) {
            sensorLeft = 1
        }

        let sensorRight = 0
        if(this._hasOpponent(mappedOpponents, myPosition.right())) {
            sensorRight = 2
        } else if (this._hasOpponent(mappedOpponents, myPosition.right().right())) {
            sensorRight = 1
        }

        // console.log(`Sensorres: `, [sensorFront, sensorLeft, sensorRight])
        return tf.tensor2d([[sensorFront, sensorLeft, sensorRight]]);
    }

    async play(orderSet, snapshot, action) {
        const reader = new GameSnapshotReader(snapshot, proto.lugo.Team.Side.HOME)
        const me = reader.getPlayer(proto.lugo.Team.Side.HOME, 5)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
            // .argMax(-1).dataSync()

        // console.log(action)
        const interval = 1/8;
        // action = action.argMax(-1).dataSync()
        //  console.log(`action: `, action)

        let dir;
        switch (action) {
            case ALL_FORWARD:
                dir =  reader.goForward()
                break;
            case ALL_BACKWARD:
                dir =  reader.goBackward()
                break;
            case ALL_LEFT:
                dir =  reader.goLeft()
                break;
            case ALL_RIGHT:
                dir =  reader.goRight()
                break;
            case ALL_FORWARD_RIGHT:
                dir =  reader.goForwardRight()
                break;
            case ALL_FORWARD_LEFT:
                dir =  reader.goForwardLeft()
                break;
            case ALL_BACKWARD_RIGHT:
                dir =  reader.goBackwardRight()
                break;
            case ALL_BACKWARD_LEFT:
                dir =  reader.goBackwardLeft()
                break;
            default:
                throw new Error(`Unknown action ${action}`)
        }
        return orderSet.setOrdersList([dir])
    }

    /**
     *
     * @param {proto.lugo.GameSnapshot} previousSnapshot
     * @param {proto.lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    async evaluate(previousSnapshot, newSnapshot) {
        const readerPrevious = new GameSnapshotReader(previousSnapshot, proto.lugo.Team.Side.HOME)
        const reader = new GameSnapshotReader(newSnapshot, proto.lugo.Team.Side.HOME)
        const me = reader.getPlayer(proto.lugo.Team.Side.HOME, 5)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        const mePreviously = readerPrevious.getPlayer(proto.lugo.Team.Side.HOME, 5)
        if (!mePreviously) {
            throw new Error("did not find myself in the game")
        }

        const mappedOpponents = this._findOpponent(reader)
        const opponentGoal = reader.getOpponentGoal().center

        const previousDist = Math.hypot(opponentGoal.getX()-mePreviously.getPosition().getX(),
            opponentGoal.getY()-mePreviously.getPosition().getY())

        const actualDist = Math.hypot(opponentGoal.getX()-me.getPosition().getX(),
            opponentGoal.getY()-me.getPosition().getY())

        const myPosition = this.#mapper.getRegionFromPoint(me.getPosition())
        let reward = 0;
        // if ( actualDist < previousDist) {
            reward = (previousDist - actualDist) / FIELD.PLAYER_MAX_SPEED
        // }
        let done = false

        if (this._hasOpponent(mappedOpponents, myPosition.left()) ||
            this._hasOpponent(mappedOpponents, myPosition.right()) ||
            this._hasOpponent(mappedOpponents, myPosition.front()) ||
            this._hasOpponent(mappedOpponents, myPosition)) {
            done = true
            reward = -2
            // console.log(`Done because got to close to an opponent`)
        } else if (mePreviously.getPosition().getX() > FIELD.MAX_X_COORDINATE * 0.9) {
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

        const randomVelocity = new proto.lugo.Velocity()
        randomVelocity.setSpeed(0)
        randomVelocity.setDirection(directions.North)// irrelevant

        const randomCol = randomInteger(minCol, maxCol)
        const randomRow = randomInteger(minRow, maxRow)
        const randomPosition = mapper.getRegion(randomCol, randomRow).getCenter()
        await this.#remoteControl.setPlayerProps(side, number, randomPosition, randomVelocity)
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
            const opponentRegion = this.#mapper.getRegionFromPoint(opponent.getPosition())
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

module.exports = {MyTrainableBot}
