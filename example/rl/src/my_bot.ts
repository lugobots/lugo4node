import {GameSnapshotReader, Lugo, Mapper, ORIENTATION, rl} from "@lugobots/lugo4node";

export const TRAINING_PLAYER_NUMBER = 5

export class MyBotTrainer implements rl.BotTrainer {

    private remoteControl: rl.RemoteControl;

    private mapper: Mapper;

    constructor(remoteControl: rl.RemoteControl) {
        this.remoteControl = remoteControl
    }

    async createNewInitialState(data: any): Promise<Lugo.GameSnapshot> {
        // Using the mapper is important for 2 reasons:
        // The mapper will help the bot to see the field in quadrants
        // and will translate the coordinates automatically regardless what side of the field the bot is playing
        // see the documentation at https://github.com/lugobots/lugo4node#mapper-and-region-classes
        this.mapper = new Mapper(20, 10, Lugo.Team.Side.HOME)

        // here I am setting all players in some random position, but of course you can change how the initial state will be
        for (let i = 1; i <= 11; i++) {
            await this._randomPlayerPos(this.mapper, Lugo.Team.Side.HOME, i)
            await this._randomPlayerPos(this.mapper, Lugo.Team.Side.AWAY, i)
        }

        // now I am changing the position of our training bot.
        // the velocity is not important yet because the game has not started, but it is required
        const randomVelocity = new Lugo.Velocity()
        randomVelocity.setSpeed(0)
        randomVelocity.setDirection(ORIENTATION.NORTH)// irrelevant
        await this.remoteControl.setPlayerProps(
            Lugo.Team.Side.HOME,
            TRAINING_PLAYER_NUMBER,
            this.mapper.getRegion(10, randomInteger(2, 7)).getCenter(),
            randomVelocity)

        // I am not using the ball in this training, so it does not really matter, I am just putting it away
        const ballPos = new Lugo.Point()
        ballPos.setX(0)
        ballPos.setY(0)
        const newVelocity = new Lugo.Velocity()
        newVelocity.setSpeed(0)
        newVelocity.setDirection(ORIENTATION.NORTH)// irrelevant

        // it is important to set the game turn to 1 every time we start the game! Otherwise the game
        // will end at some point during the training session
        await this.remoteControl.setTurn(1)
        return await this.remoteControl.setBallProps(ballPos, newVelocity)
    }

    getState(snapshot: Lugo.GameSnapshot): any {
        // here we should read the scenario and return the inputs that will be used by our neural network
        // the inputs, of course, are read from the game snapshot

        // we can return whatever format we want
        return [true, true, false];
    }

    async play(orderSet: Lugo.OrderSet, snapshot: Lugo.GameSnapshot, action: any): Promise<Lugo.OrderSet> {
        // here we will receive the action that was defined during the training step.

        // we must translate the action to an order.
        // Example:
        // let's say my possible actions are "kick" or "do not kick", I would create a order to kick the ball
        // let's say my possible actions are "go-forward", "go-right", etc... I would create an move order to that direction
        //
        // and so on.
        // Our actions will be defined in our training function based on what we are training.
        // The action can be anything, so we can have a json if several values.

        const reader = new GameSnapshotReader(snapshot, Lugo.Team.Side.HOME)
        const dir = reader.makeOrderMoveByDirection(action)
        return orderSet.setOrdersList([dir])
    }

    async evaluate(previousSnapshot: Lugo.GameSnapshot, newSnapshot: Lugo.GameSnapshot): Promise<{
        reward: number;
        done: boolean;
    }> {
        // this method is called after each turn
        // here we can evaluate how bad/good the action was.
        // Example:
        // if I am training my bot to move forward, I can check how closer to the goal he got,
        // if I am training my bot to take the ball, I can check how closer to the bot he got.

        const readerPrevious = new GameSnapshotReader(previousSnapshot, Lugo.Team.Side.HOME)
        const reader = new GameSnapshotReader(newSnapshot, Lugo.Team.Side.HOME)
        return {done: newSnapshot.getTurn() >= 20, reward: Math.random()}
    }

    async _randomPlayerPos(mapper, side, number) {
        const minCol = 10
        const maxCol = 17
        const minRow = 1
        const maxRow = 8

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
