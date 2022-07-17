"use strict";
/**
 * @fileoverview gRPC-Web generated client stub for lugo
 * @enhanceable
 * @public
 */
exports.__esModule = true;
exports.GameClient = void 0;
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
var grpcWeb = require("grpc-web");
var server_pb = require("./server_pb");
var GameClient = /** @class */ (function () {
    function GameClient(hostname, credentials, options) {
        this.methodDescriptorJoinATeam = new grpcWeb.MethodDescriptor('/lugo.Game/JoinATeam', grpcWeb.MethodType.SERVER_STREAMING, server_pb.JoinRequest, server_pb.GameSnapshot, function (request) {
            return request.serializeBinary();
        }, server_pb.GameSnapshot.deserializeBinary);
        this.methodDescriptorSendOrders = new grpcWeb.MethodDescriptor('/lugo.Game/SendOrders', grpcWeb.MethodType.UNARY, server_pb.OrderSet, server_pb.OrderResponse, function (request) {
            return request.serializeBinary();
        }, server_pb.OrderResponse.deserializeBinary);
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
    GameClient.prototype.joinATeam = function (request, metadata) {
        return this.client_.serverStreaming(this.hostname_ +
            '/lugo.Game/JoinATeam', request, metadata || {}, this.methodDescriptorJoinATeam);
    };
    GameClient.prototype.sendOrders = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Game/SendOrders', request, metadata || {}, this.methodDescriptorSendOrders, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Game/SendOrders', request, metadata || {}, this.methodDescriptorSendOrders);
    };
    return GameClient;
}());
exports.GameClient = GameClient;
