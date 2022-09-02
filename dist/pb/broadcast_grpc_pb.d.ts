// package: lugo
// file: broadcast.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as broadcast_pb from "./broadcast_pb";
import * as server_pb from "./server_pb";

interface IBroadcastService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    onEvent: IBroadcastService_IOnEvent;
    getGameSetup: IBroadcastService_IGetGameSetup;
    startGame: IBroadcastService_IStartGame;
}

interface IBroadcastService_IOnEvent extends grpc.MethodDefinition<broadcast_pb.WatcherRequest, broadcast_pb.GameEvent> {
    path: "/lugo.Broadcast/OnEvent";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<broadcast_pb.WatcherRequest>;
    requestDeserialize: grpc.deserialize<broadcast_pb.WatcherRequest>;
    responseSerialize: grpc.serialize<broadcast_pb.GameEvent>;
    responseDeserialize: grpc.deserialize<broadcast_pb.GameEvent>;
}
interface IBroadcastService_IGetGameSetup extends grpc.MethodDefinition<broadcast_pb.WatcherRequest, broadcast_pb.GameSetup> {
    path: "/lugo.Broadcast/GetGameSetup";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<broadcast_pb.WatcherRequest>;
    requestDeserialize: grpc.deserialize<broadcast_pb.WatcherRequest>;
    responseSerialize: grpc.serialize<broadcast_pb.GameSetup>;
    responseDeserialize: grpc.deserialize<broadcast_pb.GameSetup>;
}
interface IBroadcastService_IStartGame extends grpc.MethodDefinition<broadcast_pb.StartRequest, broadcast_pb.GameSetup> {
    path: "/lugo.Broadcast/StartGame";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<broadcast_pb.StartRequest>;
    requestDeserialize: grpc.deserialize<broadcast_pb.StartRequest>;
    responseSerialize: grpc.serialize<broadcast_pb.GameSetup>;
    responseDeserialize: grpc.deserialize<broadcast_pb.GameSetup>;
}

export const BroadcastService: IBroadcastService;

export interface IBroadcastServer extends grpc.UntypedServiceImplementation {
    onEvent: grpc.handleServerStreamingCall<broadcast_pb.WatcherRequest, broadcast_pb.GameEvent>;
    getGameSetup: grpc.handleUnaryCall<broadcast_pb.WatcherRequest, broadcast_pb.GameSetup>;
    startGame: grpc.handleUnaryCall<broadcast_pb.StartRequest, broadcast_pb.GameSetup>;
}

export interface IBroadcastClient {
    onEvent(request: broadcast_pb.WatcherRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<broadcast_pb.GameEvent>;
    onEvent(request: broadcast_pb.WatcherRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<broadcast_pb.GameEvent>;
    getGameSetup(request: broadcast_pb.WatcherRequest, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    getGameSetup(request: broadcast_pb.WatcherRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    getGameSetup(request: broadcast_pb.WatcherRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    startGame(request: broadcast_pb.StartRequest, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    startGame(request: broadcast_pb.StartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    startGame(request: broadcast_pb.StartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
}

export class BroadcastClient extends grpc.Client implements IBroadcastClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public onEvent(request: broadcast_pb.WatcherRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<broadcast_pb.GameEvent>;
    public onEvent(request: broadcast_pb.WatcherRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<broadcast_pb.GameEvent>;
    public getGameSetup(request: broadcast_pb.WatcherRequest, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    public getGameSetup(request: broadcast_pb.WatcherRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    public getGameSetup(request: broadcast_pb.WatcherRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    public startGame(request: broadcast_pb.StartRequest, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    public startGame(request: broadcast_pb.StartRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
    public startGame(request: broadcast_pb.StartRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: broadcast_pb.GameSetup) => void): grpc.ClientUnaryCall;
}
