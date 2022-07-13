/**
 * @fileoverview gRPC-Web generated client stub for lugo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as remote_pb from './remote_pb';


export class RemoteClient {
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

  methodDescriptorPauseOrResume = new grpcWeb.MethodDescriptor(
    '/lugo.Remote/PauseOrResume',
    grpcWeb.MethodType.UNARY,
    remote_pb.PauseResumeRequest,
    remote_pb.CommandResponse,
    (request: remote_pb.PauseResumeRequest) => {
      return request.serializeBinary();
    },
    remote_pb.CommandResponse.deserializeBinary
  );

  pauseOrResume(
    request: remote_pb.PauseResumeRequest,
    metadata: grpcWeb.Metadata | null): Promise<remote_pb.CommandResponse>;

  pauseOrResume(
    request: remote_pb.PauseResumeRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void): grpcWeb.ClientReadableStream<remote_pb.CommandResponse>;

  pauseOrResume(
    request: remote_pb.PauseResumeRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Remote/PauseOrResume',
        request,
        metadata || {},
        this.methodDescriptorPauseOrResume,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Remote/PauseOrResume',
    request,
    metadata || {},
    this.methodDescriptorPauseOrResume);
  }

  methodDescriptorNextTurn = new grpcWeb.MethodDescriptor(
    '/lugo.Remote/NextTurn',
    grpcWeb.MethodType.UNARY,
    remote_pb.NextTurnRequest,
    remote_pb.CommandResponse,
    (request: remote_pb.NextTurnRequest) => {
      return request.serializeBinary();
    },
    remote_pb.CommandResponse.deserializeBinary
  );

  nextTurn(
    request: remote_pb.NextTurnRequest,
    metadata: grpcWeb.Metadata | null): Promise<remote_pb.CommandResponse>;

  nextTurn(
    request: remote_pb.NextTurnRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void): grpcWeb.ClientReadableStream<remote_pb.CommandResponse>;

  nextTurn(
    request: remote_pb.NextTurnRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Remote/NextTurn',
        request,
        metadata || {},
        this.methodDescriptorNextTurn,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Remote/NextTurn',
    request,
    metadata || {},
    this.methodDescriptorNextTurn);
  }

  methodDescriptorNextOrder = new grpcWeb.MethodDescriptor(
    '/lugo.Remote/NextOrder',
    grpcWeb.MethodType.UNARY,
    remote_pb.NextOrderRequest,
    remote_pb.CommandResponse,
    (request: remote_pb.NextOrderRequest) => {
      return request.serializeBinary();
    },
    remote_pb.CommandResponse.deserializeBinary
  );

  nextOrder(
    request: remote_pb.NextOrderRequest,
    metadata: grpcWeb.Metadata | null): Promise<remote_pb.CommandResponse>;

  nextOrder(
    request: remote_pb.NextOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void): grpcWeb.ClientReadableStream<remote_pb.CommandResponse>;

  nextOrder(
    request: remote_pb.NextOrderRequest,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Remote/NextOrder',
        request,
        metadata || {},
        this.methodDescriptorNextOrder,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Remote/NextOrder',
    request,
    metadata || {},
    this.methodDescriptorNextOrder);
  }

  methodDescriptorSetBallProperties = new grpcWeb.MethodDescriptor(
    '/lugo.Remote/SetBallProperties',
    grpcWeb.MethodType.UNARY,
    remote_pb.BallProperties,
    remote_pb.CommandResponse,
    (request: remote_pb.BallProperties) => {
      return request.serializeBinary();
    },
    remote_pb.CommandResponse.deserializeBinary
  );

  setBallProperties(
    request: remote_pb.BallProperties,
    metadata: grpcWeb.Metadata | null): Promise<remote_pb.CommandResponse>;

  setBallProperties(
    request: remote_pb.BallProperties,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void): grpcWeb.ClientReadableStream<remote_pb.CommandResponse>;

  setBallProperties(
    request: remote_pb.BallProperties,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Remote/SetBallProperties',
        request,
        metadata || {},
        this.methodDescriptorSetBallProperties,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Remote/SetBallProperties',
    request,
    metadata || {},
    this.methodDescriptorSetBallProperties);
  }

  methodDescriptorSetPlayerProperties = new grpcWeb.MethodDescriptor(
    '/lugo.Remote/SetPlayerProperties',
    grpcWeb.MethodType.UNARY,
    remote_pb.PlayerProperties,
    remote_pb.CommandResponse,
    (request: remote_pb.PlayerProperties) => {
      return request.serializeBinary();
    },
    remote_pb.CommandResponse.deserializeBinary
  );

  setPlayerProperties(
    request: remote_pb.PlayerProperties,
    metadata: grpcWeb.Metadata | null): Promise<remote_pb.CommandResponse>;

  setPlayerProperties(
    request: remote_pb.PlayerProperties,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void): grpcWeb.ClientReadableStream<remote_pb.CommandResponse>;

  setPlayerProperties(
    request: remote_pb.PlayerProperties,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Remote/SetPlayerProperties',
        request,
        metadata || {},
        this.methodDescriptorSetPlayerProperties,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Remote/SetPlayerProperties',
    request,
    metadata || {},
    this.methodDescriptorSetPlayerProperties);
  }

  methodDescriptorSetGameProperties = new grpcWeb.MethodDescriptor(
    '/lugo.Remote/SetGameProperties',
    grpcWeb.MethodType.UNARY,
    remote_pb.GameProperties,
    remote_pb.CommandResponse,
    (request: remote_pb.GameProperties) => {
      return request.serializeBinary();
    },
    remote_pb.CommandResponse.deserializeBinary
  );

  setGameProperties(
    request: remote_pb.GameProperties,
    metadata: grpcWeb.Metadata | null): Promise<remote_pb.CommandResponse>;

  setGameProperties(
    request: remote_pb.GameProperties,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void): grpcWeb.ClientReadableStream<remote_pb.CommandResponse>;

  setGameProperties(
    request: remote_pb.GameProperties,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: remote_pb.CommandResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Remote/SetGameProperties',
        request,
        metadata || {},
        this.methodDescriptorSetGameProperties,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Remote/SetGameProperties',
    request,
    metadata || {},
    this.methodDescriptorSetGameProperties);
  }

}

