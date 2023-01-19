import {GameSnapshotReader, Lugo, Mapper, homeGoal, SPECS, ORIENTATION, rl} from "@lugobots/lugo4node";
import * as tf from "@tensorflow/tfjs-node";

export const PLAYER_NUM = 1;

export class MyBotTrainer implements rl.BotTrainer {

    private remoteControl: rl.RemoteControl;

    private mapper: Mapper;

    private target_point_y;

    constructor(remoteControl: rl.RemoteControl) {
        this.remoteControl = remoteControl
    }

    async createNewInitialState(): Promise<Lugo.GameSnapshot> {
        this.mapper = new Mapper(20, 20, Lugo.Team.Side.HOME)
        // for (let i = 1; i <= 11; i++) {
        //     await this._randomPlayerPos(this.mapper, Lugo.Team.Side.HOME, i)
        //     await this._randomPlayerPos(this.mapper, Lugo.Team.Side.AWAY, i)
        // }

        const randomVelocity = new Lugo.Velocity()
        randomVelocity.setSpeed(0)
        randomVelocity.setDirection(ORIENTATION.NORTH)// irrelevant
        await this.remoteControl.setPlayerProps(
            Lugo.Team.Side.HOME,
            PLAYER_NUM,
            homeGoal.getCenter(),
            randomVelocity)

        const ballPos = new Lugo.Point()
        ballPos.setX(Math.round(randomInteger(SPECS.GOAL_ZONE_RANGE + SPECS.PLAYER_SIZE, SPECS.GOAL_ZONE_RANGE + (SPECS.PLAYER_SIZE * 4))))
        ballPos.setY(randomInteger(homeGoal.getBottomPole().getY() - (SPECS.FIELD_HEIGHT/4), homeGoal.getTopPole().getY() + (SPECS.FIELD_HEIGHT/4)))
        const newVelocity = new Lugo.Velocity()
        newVelocity.setSpeed(SPECS.BALL_MAX_SPEED)


        const ballTarget = new Lugo.Point()
        ballTarget.setX(0)
        ballTarget.setY(randomInteger(homeGoal.getBottomPole().getY(), homeGoal.getTopPole().getY()))

        this.target_point_y = ballTarget.getY()

        let vect1 = new Lugo.Vector()
        vect1.setX(ballTarget.getX() - ballPos.getX())
        vect1.setY(ballTarget.getY() - ballPos.getY())

        newVelocity.setDirection(vect1)

        await this.remoteControl.setTurn(1)
        return await this.remoteControl.setBallProps(ballPos, newVelocity)
    }

    getInputs(snapshot: Lugo.GameSnapshot) {
        const reader = new GameSnapshotReader(snapshot, Lugo.Team.Side.HOME)
        const me = reader.getPlayer(Lugo.Team.Side.HOME, PLAYER_NUM)
        if (!me) {
            throw new Error("did not find myself in the game")
        }

        const ballPos = reader.getBall().getPosition();

        // Distand to bottom pole
        const x = me.getPosition().getY();// SPECS.FIELD_HEIGHT;
        // ball distanc in X axis
        const xDot = ballPos.getX();// SPECS.FIELD_WIDTH;
        // ball distanc in Y axis
        const theta = ballPos.getY();// SPECS.FIELD_HEIGHT;
        // ball velocity in X aix
        const thetaDot = reader.getBall().getVelocity().getDirection().getX();// SPECS.FIELD_WIDTH;

        // console.log(`Inputs: `, [x, xDot, theta, thetaDot])
        return tf.tensor2d([[x, xDot, theta, thetaDot]]);
    }

    async play(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot, action: any): Promise<Lugo.OrderSet> {

// action > 0: upper pole
// action <= 0: lower pole
        const reader = new GameSnapshotReader(snapshot, Lugo.Team.Side.HOME)
        const me = reader.getPlayer(Lugo.Team.Side.HOME, PLAYER_NUM)
        if (!me) {
            throw new Error("did not find myself in the game")
        }

        let dir = new Lugo.Vector();
        if (action === 0) {
            dir.setX(1);
        }else if (action > 0) {
            dir.setY(-1);
        }else if (action < 0) {
            dir.setY(1);
        }
        // await delay(2000)
        // console.log()
        // console.log('========')
        console.log(`dir: `, action, dir.getX(), dir.getY())
        orderSet.setDebugMessage("update")
        return orderSet.setOrdersList([reader.makeOrderMoveFromVector(dir, SPECS.PLAYER_MAX_SPEED)])
    }

    /**
     *
     * @param {Lugo.GameSnapshot} previousSnapshot
     * @param {Lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    async evaluate(previousSnapshot: Lugo.GameSnapshot, newSnapshot: Lugo.GameSnapshot): Promise<{
        reward: number;
        done: boolean;
    }> {
        const readerPrevious = new GameSnapshotReader(previousSnapshot, Lugo.Team.Side.HOME)
        const reader = new GameSnapshotReader(newSnapshot, Lugo.Team.Side.HOME)
        const me = reader.getPlayer(Lugo.Team.Side.HOME, PLAYER_NUM)
        if (!me) {
            throw new Error("did not find myself in the game")
        }
        const mePreviously = readerPrevious.getPlayer(Lugo.Team.Side.HOME, PLAYER_NUM)
        if (!mePreviously) {
            throw new Error("did not find myself in the game")
        }

        const previousYDist = Math.abs(mePreviously.getPosition().getY() - this.target_point_y)
        const newYDist = Math.abs(me.getPosition().getY() - this.target_point_y)

        let done = false
        let reward = 1;
        if (reader.getBall().getPosition().getX() <= SPECS.PLAYER_SIZE) {
            done = true
            // if (newYDist < SPECS.PLAYER_SIZE) {
            //     reward += 3;
            // }
        }
        if (previousYDist <= newYDist) {
            reward = -1;

        }
        // console.log({done, reward});
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
        return await this.remoteControl.setPlayerProps(side, number, randomPosition, randomVelocity)
        // return new Promise(resolve => {resolve(true)})
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
    return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min);
}

export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))
