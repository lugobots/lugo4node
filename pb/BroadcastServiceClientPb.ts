/**
 * @fileoverview gRPC-Web generated client stub for lugo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as broadcast_pb from './broadcast_pb';


export class BroadcastClient {
  client_: grpcWeb.AbstractClientBase;
  hostname_: string;
  credentials_: null | { [index: string]: string; };
  options_: null | { [index: string]: any; };

  constructor (hostname: string,
               credentials?: null | { [index: string]: string; },
               options?: null | { [index: string]: any; }) {
    if (!options) options = {};
    if (!credentials) credentials = {};
    options['format'] = 'binary';

    this.client_ = new grpcWeb.GrpcWebClientBase(options);
    this.hostname_ = hostname;
    this.credentials_ = credentials;
    this.options_ = options;
  }

  methodDescriptorOnEvent = new grpcWeb.MethodDescriptor(
    '/lugo.Broadcast/OnEvent',
    grpcWeb.MethodType.SERVER_STREAMING,
    broadcast_pb.WatcherRequest,
    broadcast_pb.GameEvent,
    (request: broadcast_pb.WatcherRequest) => {
      return request.serializeBinary();
    },
    broadcast_pb.GameEvent.deserializeBinary
  );

  onEvent(
    request: broadcast_pb.WatcherRequest,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<broadcast_pb.GameEvent> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/lugo.Broadcast/OnEvent',
      request,
      metadata || {},
      this.methodDescriptorOnEvent);
  }

  methodDescriptorGetGameSetup = new grpcWeb.MethodDescriptor(
    '/lugo.Broadcast/GetGameSetup',
    grpcWeb.MethodType.UNARY,
    broadcast_pb.WatcherRequest,
    broadcast_pb.GameSetup,
    (request: broadcast_pb.WatcherRequest) => {
      return request.serializeBinary();
    },
    broadcast_pb.GameSetup.deserializeBinary
  );

  getGameSetup(
    request: broadcast_pb.WatcherRequest,
    metadata: grpcWeb.Metadata | null): Promise<broadcast_pb.GameSetup>;

  getGameSetup(
    request: broadcast_pb.WatcherRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: broadcast_pb.GameSetup) => void): grpcWeb.ClientReadableStream<broadcast_pb.GameSetup>;

  getGameSetup(
    request: broadcast_pb.WatcherRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: broadcast_pb.GameSetup) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Broadcast/GetGameSetup',
        request,
        metadata || {},
        this.methodDescriptorGetGameSetup,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Broadcast/GetGameSetup',
    request,
    metadata || {},
    this.methodDescriptorGetGameSetup);
  }

  methodDescriptorStartGame = new grpcWeb.MethodDescriptor(
    '/lugo.Broadcast/StartGame',
    grpcWeb.MethodType.UNARY,
    broadcast_pb.StartRequest,
    broadcast_pb.GameSetup,
    (request: broadcast_pb.StartRequest) => {
      return request.serializeBinary();
    },
    broadcast_pb.GameSetup.deserializeBinary
  );

  startGame(
    request: broadcast_pb.StartRequest,
    metadata: grpcWeb.Metadata | null): Promise<broadcast_pb.GameSetup>;

  startGame(
    request: broadcast_pb.StartRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: broadcast_pb.GameSetup) => void): grpcWeb.ClientReadableStream<broadcast_pb.GameSetup>;

  startGame(
    request: broadcast_pb.StartRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: broadcast_pb.GameSetup) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Broadcast/StartGame',
        request,
        metadata || {},
        this.methodDescriptorStartGame,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Broadcast/StartGame',
    request,
    metadata || {},
    this.methodDescriptorStartGame);
  }

}

