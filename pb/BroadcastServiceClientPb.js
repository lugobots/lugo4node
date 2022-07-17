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
    constructor(hostname, credentials, options) {
        this.methodDescriptorOnEvent = new grpcWeb.MethodDescriptor('/lugo.Broadcast/OnEvent', grpcWeb.MethodType.SERVER_STREAMING, broadcast_pb.WatcherRequest, broadcast_pb.GameEvent, (request) => {
            return request.serializeBinary();
        }, broadcast_pb.GameEvent.deserializeBinary);
        this.methodDescriptorGetGameSetup = new grpcWeb.MethodDescriptor('/lugo.Broadcast/GetGameSetup', grpcWeb.MethodType.UNARY, broadcast_pb.WatcherRequest, broadcast_pb.GameSetup, (request) => {
            return request.serializeBinary();
        }, broadcast_pb.GameSetup.deserializeBinary);
        this.methodDescriptorStartGame = new grpcWeb.MethodDescriptor('/lugo.Broadcast/StartGame', grpcWeb.MethodType.UNARY, broadcast_pb.StartRequest, broadcast_pb.GameSetup, (request) => {
            return request.serializeBinary();
        }, broadcast_pb.GameSetup.deserializeBinary);
        if (!options)
            options = {};
        if (!credentials)
            credentials = {};
        options['format'] = 'binary';
        this.client_ = new grpcWeb.GrpcWebClientBase(options);
        this.hostname_ = hostname;
        this.credentials_ = credentials;
        this.options_ = options;
    }
    onEvent(request, metadata) {
        return this.client_.serverStreaming(this.hostname_ +
            '/lugo.Broadcast/OnEvent', request, metadata || {}, this.methodDescriptorOnEvent);
    }
    getGameSetup(request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Broadcast/GetGameSetup', request, metadata || {}, this.methodDescriptorGetGameSetup, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Broadcast/GetGameSetup', request, metadata || {}, this.methodDescriptorGetGameSetup);
    }
    startGame(request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Broadcast/StartGame', request, metadata || {}, this.methodDescriptorStartGame, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Broadcast/StartGame', request, metadata || {}, this.methodDescriptorStartGame);
    }
}
