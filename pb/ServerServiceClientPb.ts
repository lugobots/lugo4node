/**
 * @fileoverview gRPC-Web generated client stub for lugo
 * @enhanceable
 * @public
 */

// GENERATED CODE -- DO NOT EDIT!


/* eslint-disable */
// @ts-nocheck


import * as grpcWeb from 'grpc-web';

import * as server_pb from './server_pb';


export class GameClient {
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

  methodDescriptorJoinATeam = new grpcWeb.MethodDescriptor(
    '/lugo.Game/JoinATeam',
    grpcWeb.MethodType.SERVER_STREAMING,
    server_pb.JoinRequest,
    server_pb.GameSnapshot,
    (request: server_pb.JoinRequest) => {
      return request.serializeBinary();
    },
    server_pb.GameSnapshot.deserializeBinary
  );

  joinATeam(
    request: server_pb.JoinRequest,
    metadata?: grpcWeb.Metadata): grpcWeb.ClientReadableStream<server_pb.GameSnapshot> {
    return this.client_.serverStreaming(
      this.hostname_ +
        '/lugo.Game/JoinATeam',
      request,
      metadata || {},
      this.methodDescriptorJoinATeam);
  }

  methodDescriptorSendOrders = new grpcWeb.MethodDescriptor(
    '/lugo.Game/SendOrders',
    grpcWeb.MethodType.UNARY,
    server_pb.OrderSet,
    server_pb.OrderResponse,
    (request: server_pb.OrderSet) => {
      return request.serializeBinary();
    },
    server_pb.OrderResponse.deserializeBinary
  );

  sendOrders(
    request: server_pb.OrderSet,
    metadata: grpcWeb.Metadata | null): Promise<server_pb.OrderResponse>;

  sendOrders(
    request: server_pb.OrderSet,
    metadata: grpcWeb.Metadata | null,
    callback: (err: grpcWeb.RpcError,
               response: server_pb.OrderResponse) => void): grpcWeb.ClientReadableStream<server_pb.OrderResponse>;

  sendOrders(
    request: server_pb.OrderSet,
    metadata: grpcWeb.Metadata | null,
    callback?: (err: grpcWeb.RpcError,
               response: server_pb.OrderResponse) => void) {
    if (callback !== undefined) {
      return this.client_.rpcCall(
        this.hostname_ +
          '/lugo.Game/SendOrders',
        request,
        metadata || {},
        this.methodDescriptorSendOrders,
        callback);
    }
    return this.client_.unaryCall(
    this.hostname_ +
      '/lugo.Game/SendOrders',
    request,
    metadata || {},
    this.methodDescriptorSendOrders);
  }

}

