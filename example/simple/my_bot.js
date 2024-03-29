const {GameSnapshotReader, Bot, PLAYER_STATE, Mapper, BroadcastClient,  } = require('@lugobots/lugo4node')


class MyBot {
  /**
   * @type {Lugo.Team.Side}
   */
  #side;

  /**
   * @type {number}
   */
  #number;

  /**
   * @type {physics.Point}
   */
  #initPosition;

  /**
   * @type {Mapper}
   */
  #mapper;

  /**
   *
   * @param {Lugo.Team.Side} side
   * @param {number} number
   * @param {physics.Point} initPosition
   * @param {Mapper} mapper
   */
  constructor(side, number, initPosition, mapper) {
    this.#side = side
    this.#number = number
    this.#mapper = mapper
    this.#initPosition = initPosition

  }

  /**
   *
   * @param {GameSnapshot} snapshot
   * @private
   * @return {GameSnapshotReader}
   */
  _makeReader(snapshot) {
    const reader = new GameSnapshotReader(snapshot, this.#side)
    const me = reader.getPlayer(this.#side, this.#number)
    if (!me) {
      throw new Error("did not find myself in the game")
    }
    return {reader, me}
  }

  /**
   *
   * @param {} orderSet
   * @param snapshot
   * @return {*}
   */
  onDisputing(orderSet, snapshot) {
    try {
      const {reader, me} = this._makeReader(snapshot)

      const ballPosition = reader.getBall().getPosition()
      const ballRegion = this.#mapper.getRegionFromPoint(ballPosition)
      const myRegion = this.#mapper.getRegionFromPoint(this.#initPosition)

      let moveDest = this.#initPosition
      if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
        Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
        moveDest = ballPosition
      }
      const moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), moveDest)
      // const catchOrder = reader.
      orderSet.setTurn(snapshot.getTurn())
      orderSet.setDebugMessage("mi mi mi")
      orderSet.setOrdersList([moveOrder])
      return orderSet
    } catch (e) {
      console.log(`did not play this turn`, e)
    }
  }

  onDefending(orderSet, snapshot) {
    try {
      const {reader, me} = this._makeReader(snapshot)
      const ballPosition = snapshot.getBall().getPosition()
      const ballRegion = this.#mapper.getRegionFromPoint(ballPosition)
      const myRegion = this.#mapper.getRegionFromPoint(this.#initPosition)

      let moveDest = this.#initPosition
      if (Math.abs(myRegion.getRow() - ballRegion.getRow()) <= 2 &&
        Math.abs(myRegion.getCol() - ballRegion.getCol()) <= 2) {
        moveDest = ballPosition
      }
      const moveOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), moveDest)
      const catchOrder =  reader.makeOrderCatch()

      orderSet.setTurn(snapshot.getTurn())
      orderSet.setDebugMessage("trying to catch the ball")
      orderSet.setOrdersList([moveOrder, catchOrder])
      return orderSet
    } catch (e) {
      console.log(`did not play this turn`, e)
    }
  }

  onHolding(orderSet, snapshot) {
    try {
      const {reader, me} = this._makeReader(snapshot)

      const myGoalCenter = this.#mapper.getRegionFromPoint(reader.getOpponentGoal().center)
      const currentRegion = this.#mapper.getRegionFromPoint(me.getPosition())

      let myOrder;
      if (Math.abs(currentRegion.getRow() - myGoalCenter.getRow()) <= 1 &&
        Math.abs(currentRegion.getCol() - myGoalCenter.getCol()) <= 1) {
        myOrder = reader.makeOrderKickMaxSpeed(snapshot.getBall(), reader.getOpponentGoal().center)
      } else {
        myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), reader.getOpponentGoal().center)
      }

      orderSet.setTurn(snapshot.getTurn())
      orderSet.setDebugMessage("attack!")
      orderSet.setOrdersList([myOrder])
      return orderSet
    } catch (e) {
      console.log(`did not play this turn`, e)
    }
  }

  onSupporting(orderSet, snapshot) {
    try {
      const {reader, me} = this._makeReader(snapshot)
      const ballHolderPosition = snapshot.getBall().getPosition()
      const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), ballHolderPosition)

      orderSet.setTurn(snapshot.getTurn())
      orderSet.setDebugMessage("supporting")
      orderSet.setOrdersList([myOrder])
      return orderSet
    } catch (e) {
      console.log(`did not play this turn`, e)
    }
  }

  /**
   *
   * @param orderSet
   * @param snapshot
   * @param state
   * @return {OrderSet}
   */
  asGoalkeeper(orderSet, snapshot, state) {
    try {
      const {reader, me} = this._makeReader(snapshot)
      let position = snapshot.getBall().getPosition()
      if (state !== PLAYER_STATE.DISPUTING_THE_BALL) {
        position = reader.getMyGoal().center
      }

      const myOrder = reader.makeOrderMoveMaxSpeed(me.getPosition(), position)

      const orderSet = new Lugo.OrderSet()
      orderSet.setTurn(snapshot.getTurn())
      orderSet.setDebugMessage("supporting")
      orderSet.setOrdersList([myOrder, reader.makeOrderCatch()])
      return orderSet
    } catch (e) {
      console.log(`did not play this turn`, e)
    }
  }
}

module.exports = MyBot
