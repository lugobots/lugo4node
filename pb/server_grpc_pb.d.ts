// package: lugo
// file: server.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as server_pb from "./server_pb";
import * as physics_pb from "./physics_pb";

interface IGameService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    joinATeam: IGameService_IJoinATeam;
    sendOrders: IGameService_ISendOrders;
}

interface IGameService_IJoinATeam extends grpc.MethodDefinition<server_pb.JoinRequest, server_pb.GameSnapshot> {
    path: "/lugo.Game/JoinATeam";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<server_pb.JoinRequest>;
    requestDeserialize: grpc.deserialize<server_pb.JoinRequest>;
    responseSerialize: grpc.serialize<server_pb.GameSnapshot>;
    responseDeserialize: grpc.deserialize<server_pb.GameSnapshot>;
}
interface IGameService_ISendOrders extends grpc.MethodDefinition<server_pb.OrderSet, server_pb.OrderResponse> {
    path: "/lugo.Game/SendOrders";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<server_pb.OrderSet>;
    requestDeserialize: grpc.deserialize<server_pb.OrderSet>;
    responseSerialize: grpc.serialize<server_pb.OrderResponse>;
    responseDeserialize: grpc.deserialize<server_pb.OrderResponse>;
}

export const GameService: IGameService;

export interface IGameServer {
    joinATeam: grpc.handleServerStreamingCall<server_pb.JoinRequest, server_pb.GameSnapshot>;
    sendOrders: grpc.handleUnaryCall<server_pb.OrderSet, server_pb.OrderResponse>;
}

export interface IGameClient {
    joinATeam(request: server_pb.JoinRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    joinATeam(request: server_pb.JoinRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    sendOrders(request: server_pb.OrderSet, callback: (error: grpc.ServiceError | null, response: server_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    sendOrders(request: server_pb.OrderSet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: server_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    sendOrders(request: server_pb.OrderSet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: server_pb.OrderResponse) => void): grpc.ClientUnaryCall;
}

export class GameClient extends grpc.Client implements IGameClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
    public joinATeam(request: server_pb.JoinRequest, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    public joinATeam(request: server_pb.JoinRequest, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    public sendOrders(request: server_pb.OrderSet, callback: (error: grpc.ServiceError | null, response: server_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    public sendOrders(request: server_pb.OrderSet, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: server_pb.OrderResponse) => void): grpc.ClientUnaryCall;
    public sendOrders(request: server_pb.OrderSet, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: server_pb.OrderResponse) => void): grpc.ClientUnaryCall;
}
