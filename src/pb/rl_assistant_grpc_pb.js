// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var rl_assistant_pb = require('./rl_assistant_pb.js');
var server_pb = require('./server_pb.js');

function serialize_lugo_GameSnapshot(arg) {
  if (!(arg instanceof server_pb.GameSnapshot)) {
    throw new Error('Expected argument of type lugo.GameSnapshot');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lugo_GameSnapshot(buffer_arg) {
  return server_pb.GameSnapshot.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lugo_PlayersOrders(arg) {
  if (!(arg instanceof rl_assistant_pb.PlayersOrders)) {
    throw new Error('Expected argument of type lugo.PlayersOrders');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lugo_PlayersOrders(buffer_arg) {
  return rl_assistant_pb.PlayersOrders.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lugo_RLResetConfig(arg) {
  if (!(arg instanceof rl_assistant_pb.RLResetConfig)) {
    throw new Error('Expected argument of type lugo.RLResetConfig');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lugo_RLResetConfig(buffer_arg) {
  return rl_assistant_pb.RLResetConfig.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lugo_RLSessionConfig(arg) {
  if (!(arg instanceof rl_assistant_pb.RLSessionConfig)) {
    throw new Error('Expected argument of type lugo.RLSessionConfig');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lugo_RLSessionConfig(buffer_arg) {
  return rl_assistant_pb.RLSessionConfig.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_lugo_TurnOutcome(arg) {
  if (!(arg instanceof rl_assistant_pb.TurnOutcome)) {
    throw new Error('Expected argument of type lugo.TurnOutcome');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_lugo_TurnOutcome(buffer_arg) {
  return rl_assistant_pb.TurnOutcome.deserializeBinary(new Uint8Array(buffer_arg));
}


var RLAssistantService = exports.RLAssistantService = {
  // StartSession will create 11 player connections on each team and wait the game to be on the waiting status
// It will return a stream of game snapshots, like "Game.JoinATeam" does, but these GameSnapshot will be the
// same one returned by SendPlayersOrders. But you need to keep the stream open, otherwise the server will
// consider that the session is done.
startSession: {
    path: '/lugo.RLAssistant/StartSession',
    requestStream: false,
    responseStream: true,
    requestType: rl_assistant_pb.RLSessionConfig,
    responseType: server_pb.GameSnapshot,
    requestSerialize: serialize_lugo_RLSessionConfig,
    requestDeserialize: deserialize_lugo_RLSessionConfig,
    responseSerialize: serialize_lugo_GameSnapshot,
    responseDeserialize: deserialize_lugo_GameSnapshot,
  },
  // SendPlayersOrders will send all payers orders, and ignore the ones that do not have orders
// If there is no order from a player, it will behave are defined in PlayersOrders.default_behaviour.
// The valid values for default_behaviour are defined by the server. Please run the server help command
// for more information.
sendPlayersOrders: {
    path: '/lugo.RLAssistant/SendPlayersOrders',
    requestStream: false,
    responseStream: false,
    requestType: rl_assistant_pb.PlayersOrders,
    responseType: rl_assistant_pb.TurnOutcome,
    requestSerialize: serialize_lugo_PlayersOrders,
    requestDeserialize: deserialize_lugo_PlayersOrders,
    responseSerialize: serialize_lugo_TurnOutcome,
    responseDeserialize: deserialize_lugo_TurnOutcome,
  },
  // The training environment will need to reset the game status multiple times during the training session.
// Each time this occurs, the RL assistant must be notified by the trainer, as the game server does not emit any
// related events.
// When the environment is reset, the RL assistant will also reset its controllers to maintain synchronization with
// the game server.
resetEnv: {
    path: '/lugo.RLAssistant/ResetEnv',
    requestStream: false,
    responseStream: false,
    requestType: rl_assistant_pb.RLResetConfig,
    responseType: rl_assistant_pb.TurnOutcome,
    requestSerialize: serialize_lugo_RLResetConfig,
    requestDeserialize: deserialize_lugo_RLResetConfig,
    responseSerialize: serialize_lugo_TurnOutcome,
    responseDeserialize: deserialize_lugo_TurnOutcome,
  },
};

exports.RLAssistantClient = grpc.makeGenericClientConstructor(RLAssistantService);
