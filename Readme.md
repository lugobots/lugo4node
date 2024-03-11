# Lugo4Node - A Lugo Bots Client

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
* [First option: Implementing a Bot class (simpler and recommended)](#first-option-implementing-a-bot-class-simpler-and-recommended)
* [Second option: Implementing the turn handler (a little more work)](#second-option-implementing-the-turn-handler-a-little-more-work)
* [Third option: Using reinforcement learning :brain:](#third-option-using-reinforcement-learning-brain)
- [Helpers](#helpers)
  * [Snapshot reader](#snapshot-reader)
  * [Mapper and Region classes](#mapper-and-region-classes)
    + [The Mapper](#the-mapper)
    + [The Region](#the-region)


### Requirements

* NPM >= 16


### Usage

There are three ways to use **Lugo4Node** client:


### First option: Implementing a Bot class (simpler and recommended)

See [example](./example/simple/my_bot.js)

**Lugo4Node** client implements the method `playAsBot(bot)` that expects an instance [bot](./src/client.ts#L79) implementation.

All you need to do is creating your bot by extending that class and implementing your bot behaviour. See an example
at [example/simple/my_bot.ts](example/simple/my_bot.js)


### Second option: Implementing the turn handler (a little more work)

As you noticed, the option 1 has some logic injected in it, so you may want to remove that layer of logic and implement
yours.

The most raw way to communicate with the lugo is receiving the game raw snapshots.
See [example](./src/client.ts#L113)

In this case, you must use the client's `play` method. The `play` method will call your call back function for any
message received from the game lugo.

It may require that you know a bit more about the game steps, but still not too much.


### Third option: Using reinforcement learning :brain:

If you are a **machine learning** enthusiastic you may want to use the Lugo reinforcement learning environment.

**Lugo bots** is an asynchronous game, so you will need to use the **Lugo4Node Gym** library to create your model:

See example and documentation at [RL lib readme file](src/rl/Readme.md)


## Helpers

There are a many things that you will repeatedly need to do on your bot code, e.g. getting your bot position, creating a
move/kick/catch order, finding your teammates positions, etc.

**Lugo4Node** brings some libraries to help you with that:

### Snapshot reader

_Auto generated doc coming soon_

The Snapshot reader is quite useful. Firs to it helps you to extract data from
the [Game Snapshot](https://github.com/lugobots/protos/blob/master/doc/docs.md#lugo.GameSnapshot) each game turn.

```javascript
const inspector = new GameSnapshotInspector(proto.lugo.Team.Side.HOME, 8, snapshot);

inspector.getSnapshot(): Lugo.GameSnapshot | null
inspector.getTurn(): number
inspector.getMe(): Lugo.Player
inspector.getBall(): Lugo.Ball | null
inspector.getPlayer(side: Lugo.Team.Side, number: number): Lugo.Player | null
inspector.getBallHolder(): Lugo.Player | null
inspector.isBallHolder(player: Lugo.Player): boolean
inspector.getTeam(side: Lugo.Team.Side): Lugo.Team | null
inspector.getMyTeam(): Lugo.Team | null
inspector.getOpponentTeam(): Lugo.Team | null
inspector.getMyTeamSide(): Lugo.Team.Side
inspector.getOpponentSide(): Lugo.Team.Side
inspector.getMyTeamPlayers(): Lugo.Player[] 
inspector.getOpponentPlayers(): Lugo.Player[]
inspector.getMyTeamGoalkeeper(): Lugo.Player | null
inspector.getOpponentGoalkeeper(): Lugo.Player | null

```

And also help us to create
the [Turn Orders Set](https://github.com/lugobots/protos/blob/master/doc/docs.md#lugo.OrderSet) based on the game state
and our bot team side:

```javascript
inspector.makeOrderMove(target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderMoveMaxSpeed(target: Lugo.Point): Lugo.Order
inspector.makeOrderMoveFromPoint(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderMoveFromVector(direction: Lugo.Vector, speed: number): Lugo.Order
inspector.makeOrderMoveByDirection(direction: DIRECTION, speed?: number): Lugo.Order
inspector.makeOrderMoveToStop(): Lugo.Order
inspector.makeOrderJump(target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderKick(target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderKickMaxSpeed(target: Lugo.Point): Lugo.Order
inspector.makeOrderCatch(): Lugo.Order
```

<!-- And, last but not least, the Reader also helps our bot to see the game map based on directions instead of coordinates:

```javascript
reader.goForward()
reader.goForwardLeft()
reader.goForwardRight()
reader.goBackward()
reader.goBackwardLeft()
reader.goBackwardRight()
reader.goLeft()
reader.goRight()
``` -->

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
const region = map.getRegionFromPoint(inspector.getPlayer(proto.lugo.Team.Side.AWAY, 5))

// and you can also know the position of the goals
map.getAttackGoal(): Goal
map.getDefenseGoal(): Goal
```

#### The Region

The Region helps your bot to see the game map in quadrants, so it can move over the field without caring about coordinates or team side.

```javascript
region.front()
region.back()
region.left()
region.right()
```
