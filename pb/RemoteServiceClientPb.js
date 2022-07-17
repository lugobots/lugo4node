"use strict";
/**
 * @fileoverview gRPC-Web generated client stub for lugo
 * @enhanceable
 * @public
 */
exports.__esModule = true;
exports.RemoteClient = void 0;
// GENERATED CODE -- DO NOT EDIT!
/* eslint-disable */
// @ts-nocheck
var grpcWeb = require("grpc-web");
var remote_pb = require("./remote_pb");
var RemoteClient = /** @class */ (function () {
    function RemoteClient(hostname, credentials, options) {
        this.methodDescriptorPauseOrResume = new grpcWeb.MethodDescriptor('/lugo.Remote/PauseOrResume', grpcWeb.MethodType.UNARY, remote_pb.PauseResumeRequest, remote_pb.CommandResponse, function (request) {
            return request.serializeBinary();
        }, remote_pb.CommandResponse.deserializeBinary);
        this.methodDescriptorNextTurn = new grpcWeb.MethodDescriptor('/lugo.Remote/NextTurn', grpcWeb.MethodType.UNARY, remote_pb.NextTurnRequest, remote_pb.CommandResponse, function (request) {
            return request.serializeBinary();
        }, remote_pb.CommandResponse.deserializeBinary);
        this.methodDescriptorNextOrder = new grpcWeb.MethodDescriptor('/lugo.Remote/NextOrder', grpcWeb.MethodType.UNARY, remote_pb.NextOrderRequest, remote_pb.CommandResponse, function (request) {
            return request.serializeBinary();
        }, remote_pb.CommandResponse.deserializeBinary);
        this.methodDescriptorSetBallProperties = new grpcWeb.MethodDescriptor('/lugo.Remote/SetBallProperties', grpcWeb.MethodType.UNARY, remote_pb.BallProperties, remote_pb.CommandResponse, function (request) {
            return request.serializeBinary();
        }, remote_pb.CommandResponse.deserializeBinary);
        this.methodDescriptorSetPlayerProperties = new grpcWeb.MethodDescriptor('/lugo.Remote/SetPlayerProperties', grpcWeb.MethodType.UNARY, remote_pb.PlayerProperties, remote_pb.CommandResponse, function (request) {
            return request.serializeBinary();
        }, remote_pb.CommandResponse.deserializeBinary);
        this.methodDescriptorSetGameProperties = new grpcWeb.MethodDescriptor('/lugo.Remote/SetGameProperties', grpcWeb.MethodType.UNARY, remote_pb.GameProperties, remote_pb.CommandResponse, function (request) {
            return request.serializeBinary();
        }, remote_pb.CommandResponse.deserializeBinary);
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
    RemoteClient.prototype.pauseOrResume = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Remote/PauseOrResume', request, metadata || {}, this.methodDescriptorPauseOrResume, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Remote/PauseOrResume', request, metadata || {}, this.methodDescriptorPauseOrResume);
    };
    RemoteClient.prototype.nextTurn = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Remote/NextTurn', request, metadata || {}, this.methodDescriptorNextTurn, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Remote/NextTurn', request, metadata || {}, this.methodDescriptorNextTurn);
    };
    RemoteClient.prototype.nextOrder = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Remote/NextOrder', request, metadata || {}, this.methodDescriptorNextOrder, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Remote/NextOrder', request, metadata || {}, this.methodDescriptorNextOrder);
    };
    RemoteClient.prototype.setBallProperties = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Remote/SetBallProperties', request, metadata || {}, this.methodDescriptorSetBallProperties, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Remote/SetBallProperties', request, metadata || {}, this.methodDescriptorSetBallProperties);
    };
    RemoteClient.prototype.setPlayerProperties = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Remote/SetPlayerProperties', request, metadata || {}, this.methodDescriptorSetPlayerProperties, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Remote/SetPlayerProperties', request, metadata || {}, this.methodDescriptorSetPlayerProperties);
    };
    RemoteClient.prototype.setGameProperties = function (request, metadata, callback) {
        if (callback !== undefined) {
            return this.client_.rpcCall(this.hostname_ +
                '/lugo.Remote/SetGameProperties', request, metadata || {}, this.methodDescriptorSetGameProperties, callback);
        }
        return this.client_.unaryCall(this.hostname_ +
            '/lugo.Remote/SetGameProperties', request, metadata || {}, this.methodDescriptorSetGameProperties);
    };
    return RemoteClient;
}());
exports.RemoteClient = RemoteClient;
