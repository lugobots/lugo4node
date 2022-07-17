"use strict";
/**
 * @fileoverview gRPC-Web generated client stub for lugo
 * @enhanceable
 * @public
 */
exports.__esModule = true;
exports.BroadcastClient = void 0;
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
var grpcWeb = require("grpc-web");
var broadcast_pb = require("./broadcast_pb");
var BroadcastClient = /** @class */ (function () {
    function BroadcastClient(hostname, credentials, options) {
        this.methodDescriptorOnEvent = new grpcWeb.MethodDescriptor('/lugo.Broadcast/OnEvent', grpcWeb.MethodType.SERVER_STREAMING, broadcast_pb.WatcherRequest, broadcast_pb.GameEvent, function (request) {
            return request.serializeBinary();
        }, broadcast_pb.GameEvent.deserializeBinary);
        this.methodDescriptorGetGameSetup = new grpcWeb.MethodDescriptor('/lugo.Broadcast/GetGameSetup', grpcWeb.MethodType.UNARY, broadcast_pb.WatcherRequest, broadcast_pb.GameSetup, function (request) {
            return request.serializeBinary();
        }, broadcast_pb.GameSetup.deserializeBinary);
        this.methodDescriptorStartGame = new grpcWeb.MethodDescriptor('/lugo.Broadcast/StartGame', grpcWeb.MethodType.UNARY, broadcast_pb.StartRequest, broadcast_pb.GameSetup, function (request) {
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
    BroadcastClient.prototype.onEvent = function (request, metadata) {
        return this.client_.serverStreaming(this.hostname_ +
            '/lugo.Broadcast/OnEvent', request, metadata || {}, this.methodDescriptorOnEvent);
    };
    BroadcastClient.prototype.getGameSetup = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Broadcast/GetGameSetup', request, metadata || {}, this.methodDescriptorGetGameSetup, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Broadcast/GetGameSetup', request, metadata || {}, this.methodDescriptorGetGameSetup);
    };
    BroadcastClient.prototype.startGame = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Broadcast/StartGame', request, metadata || {}, this.methodDescriptorStartGame, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Broadcast/StartGame', request, metadata || {}, this.methodDescriptorStartGame);
    };
    return BroadcastClient;
}());
exports.BroadcastClient = BroadcastClient;
