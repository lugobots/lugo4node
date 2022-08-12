# Lugo4Node - A Lugo Bots Client (Deep learning ready :brain:)

Lugo4Node is a NodeJS implementation of a client player for [Lugo](https://lugobots.dev/) game.

It **is not a bot** that plays the game, it is only the client for the game lugo.

This client implements a brainless player in the game. So, this library implements many methods that does not affect the
player intelligence/behaviour/decisions. It is meant to reduce the developer concerns on communication, protocols,
attributes, etc.

Using this client, you just need to implement the Artificial Intelligence of your player and some other few methods to
support your strategy (see the project [exampe](./example/simple) folder).


# Table of Contents
* [Requirements](#requirements)
* [Usage](#usage)
* How to create a bot
  * [First option: Implementing a Bot class (simpler and recommended)](#first-option--implementing-a-bot-class--simpler-and-recommended-)
  * [Second option: Implementing the turn handler (a little more work)](#second-option--implementing-the-turn-handler--a-little-more-work-)
  * [Third option: Using Tensorflow training model](#third-option--using-tensorflow-training-model)
      + [1. Create a Trainable bot](#1-create-a-trainable-bot)
      + [2. Create a training function](#2-create-a-training-function)
      + [3. Run the game lugo in Dev Mode](#3-run-the-game-server-in-dev-mode)
      + [4. Starting your trainable bot](#4-starting-your-trainable-bot)
      + [5. Adding more players to the game](#5-adding-more-players-to-the-game)
- [Helpers](#helpers)
    * [Snapshot reader](#snapshot-reader)
    * [Mapper and Region classes](#mapper-and-region-classes)
- [Next steps](#next-steps)
    * [Deploying you bots](#deploying-you-bots)

### Requirements

* NPM >= 16


### Usage

There are three ways to use **Lugo4Node** client:


### First option: Implementing a Bot class (simpler and recommended)

See [example](./example/simple/index-bot-handler.js)

**Lugo4Node** client implements the method `playAsBot(bot)` that expects an instance [bot](stub.js#L11) implementation.

All you need to do is creating your bot by extending that class and implementing your bot behaviour. See an example
at [example/simple/my_bot.ts](example/simple/my_bot.js)


### Second option: Implementing the turn handler (a little more work)

As you noticed, the option 1 has some logic injected in it, so you may want to remove that layer of logic and implement
yours.

The most raw way to communicate with the lugo is receiving the game raw snapshots.
See [example](./example/simple/index-turn-handler.js)

In this case, you must use the client's `play` method. The `play` method will call your call back function for any
message received from the game lugo.

It may require that you know a bit more about the game steps, but still not too much.


### Third option: Using Tensorflow training model 

**IMPORTANT** The deep learning feature is broken in the versions greater than v0.0.1-beta.2

If you are a **deep learning** enthusiastic and knows [Tensorflow JS](https://tensorflow.org/js), you may want to use
the Lugo deep learning environment.

**Lugo bots** is an asynchronous game, so you will need to use the **Lugo4Node Gym** library to create your:

See example in [Deep learning example project](example/deeplearning)

#### 1. Create a Trainable bot

Create a class that extends the [Trainable bot](deep_learning/stubs.js#L28). Your trainable bot will be responsible for:

* processing the actions generated by your training model (see method `play(orderSet, snapshot, action)`)
* creating new scenarios for each training game
* evaluate the actions rewards
* and return the scenario state in the format of a tensor (see method `getInputs(snapshot)`)

**Important**: You can train only one player at once. So, your trainable bot must play as a single play (defined by the
player number). See in the next steps how add more players to the game.

Class stub:

```javascript
class TrainableBot {
    /**
     *
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    async createNewInitialState() {
    }

    /**
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {Promise<tf.Tensor>}
     */
    async getInputs(snapshot) {
    }

    /**
     *
     * @param o{proto.lugo.OrderSet} rderSet
     * @param {proto.lugo.GameSnapshot} snapshot
     * @param {*} action
     * @returns {Promise<void>}
     */
    async play(orderSet, snapshot, action) {
    }

    /**
     *
     * @param {proto.lugo.GameSnapshot} previousSnapshot
     * @param {proto.lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    async evaluate(previousSnapshot, newSnapshot) {
    }
}

```


#### 2. Create a training function

If you are familiar with deep learn and **Tensorflow**, you know what a training function does. The only particularity
for Lugo Deep learning environment is that our training function will receive as a parameter an instance of
a [Lugo4Node Coach](deep_learning/stubs.js#L1).

Your training function will use the coach instance to set random states, get the new state tensor, and to update the
game state based in an action defined by your training model.

Under the hood, the Gym will call your trainable bot methods based on the game flow, and your Training Function will
call the Coach based on the training session flow:

```javascript
/**
 *
 * @param {Coach} coach
 * @returns {Promise<void>}
 */
async function myTrainingFunction(coach) {

    // ... create a model 
    // ... define optimizers, 
    // ... etc...
    for (let i = 0; i < trainIterations; ++i) {

        //... 
        await coach.setRandomState()

        const inputTensor = await coach.getStateTensor();

        // ....

        const {done, reward} = await coach.update(trainingModelPredictions);

        if (done) {
            // do this
        } else {
            // do that
        }
    }
    await coach.close()
}
```


#### 3. Run the game lugo in Dev Mode

The **Game Server** must be started in _dev mode_ to run training sessions.

Run this command below or read the Game Server `--help` instructions to find more options:

```shell
docker run -p 8080:8080 -p 5000:5000 lugobots/lugo:v1.0.0-beta play --dev-mode --waiting-duration 1m
```


#### 4. Starting your trainable bot

Now, create a **Lugo4Node** client, but instead of using the client to play using your bot, you will start a game using
the Gym class.


##### Remote control

The Gym will require a trainable bot, a training function, and a Remove Control.

The remote control the game flow by pausing, calling the next turn, etc. (see
the [Remove Service in the Game protocol definition](https://github.com/lugobots/protos/blob/master/doc/docs.md#remote))

The remote control is already implemented in **Lugo4Node** package.:

```javascript
    const rc = new deep_learning.RemoteControl();
    await rc.connect(grpcAddress)
```


##### Everything together

```javascript
    const bot = new ATranableBot(rc)

const lugoClient = new Client(
    grpcAddress,
    false, // always false for now
    "",
    teamSide,
    playerNumber,
    initialRegion.getCenter())

const rc = new deep_learning.RemoteControl();
await rc.connect(grpcAddress)

const gym = new deep_learning.Gym(rc, bot, myTrainingFunction, {debugging_log: false})
await gym.start(lugoClient)
```


#### 5. Adding more players to the game

The Game Server requires exactly 11 players to start the game. Since your trainable bot can only play as one player in
the game, you will need complete your game with more players.

You may start another bot team (
see [The Dummies bot](https://github.com/lugobots/the-dummies-go#option-a---running-them-in-containers-no-git-clone-needed) )
or you may use _Zombie PLayers_.

The  _Zombie PLayers_ are bots the only connects to the game, but they do nothing else during the entire game. The Gym
class comes with a method that will start these zombies right after the trainable bot be ready to play.

```javascript
    // instead of starting the training session with 
await gym.start(lugoClient)

// start with
await gym.withZombiePlayers(grpcAddress).start(lugoClient)
```

**Note** that the Gym will try to connect 11 players in each side, so at least one of the connections will fail because
one position is already occupied by your trainable bot.

## Helpers

There are a many things that you will repeatedly need to do on your bot code, e.g. getting your bot position, creating a
move/kick/catch order, finding your teammates positions, etc.

**Lugo4Node** brings some libraries to help you with that:

### Snapshot reader

_Auto generated doc coming soon_

The Snapshot reader is quite useful. Firs to it helps you to extract data from
the [Game Snapshot](https://github.com/lugobots/protos/blob/master/doc/docs.md#lugo.GameSnapshot) each game turn.

```javascript
const reader = new GameSnapshotReader(snapshot, proto.lugo.Team.Side.HOME)
reader.getMyTeam()
reader.getTeam(side)
reader.isBallHolder(player)
reader.getOpponentSide()
reader.getMyGoal()
reader.getOpponentGoal()
reader.getPlayer(side, number)

```

And also help us to create
the [Turn Orders Set](https://github.com/lugobots/protos/blob/master/doc/docs.md#lugo.OrderSet) based on the game state
and our bot team side:

```javascript
reader.makeOrderMoveMaxSpeed(origin, target)
reader.makeOrderMove(origin, target, speed)
reader.makeOrderKick(ball, target, speed)
reader.makeOrderKickMaxSpeed(ball, target)
reader.makeOrderCatch()
```

And, last but not least, the Reader also helps our bot to see the game map based on directions instead of coordinates:

```javascript
reader.goForward()
reader.goForwardLeft()
reader.goForwardRight()
reader.goBackward()
reader.goBackwardLeft()
reader.goBackwardRight()
reader.goLeft()
reader.goRight()
```

### Mapper and Region classes

Naturally, the bots see the game field based on coordinates `x` and `y`, as in a cartesian plane.

However, that's not something that we want to be concerned about during the bot development.

The classes Mapper and Region work together to facilitate it for use.

#### The Mapper

`Mapper` slices the field in columns and rows, so your bot does not have to care about precise coordinates or the team
side. The mapper will automatically translate the map position to the bot side.

And you may define how many columns/rows your field will be divided into.

```javascript
const map = new Mapper(10, 10, teamSide)

// you may find a Map Region based in coordinates:
const region = map.getRegion(2, 3)

// and you may find a Map Region based in a map point
const region = map.getRegionFromPoint(reader.getPlayer(proto.lugo.Team.Side.AWAY, 5))
```

#### The Region

The Region helps your bot to see the game map in quadrants, so it can move over the field without caring about coordinates or team side.

```javascript
region.front()
region.back()
region.left()
region.right()
```

## Next steps


### Deploying you bots

Coming soon
