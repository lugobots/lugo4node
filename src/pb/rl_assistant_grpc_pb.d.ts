// package: lugo
// file: rl_assistant.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as rl_assistant_pb from "./rl_assistant_pb";
import * as server_pb from "./server_pb";

interface IRLAssistantService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    startSession: IRLAssistantService_IStartSession;
    sendPlayersOrders: IRLAssistantService_ISendPlayersOrders;
    resetEnv: IRLAssistantService_IResetEnv;
}

interface IRLAssistantService_IStartSession extends grpc.MethodDefinition<rl_assistant_pb.RLSessionConfig, server_pb.GameSnapshot> {
    path: "/lugo.RLAssistant/StartSession";
    requestStream: false;
    responseStream: true;
    requestSerialize: grpc.serialize<rl_assistant_pb.RLSessionConfig>;
    requestDeserialize: grpc.deserialize<rl_assistant_pb.RLSessionConfig>;
    responseSerialize: grpc.serialize<server_pb.GameSnapshot>;
    responseDeserialize: grpc.deserialize<server_pb.GameSnapshot>;
}
interface IRLAssistantService_ISendPlayersOrders extends grpc.MethodDefinition<rl_assistant_pb.PlayersOrders, rl_assistant_pb.TurnOutcome> {
    path: "/lugo.RLAssistant/SendPlayersOrders";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<rl_assistant_pb.PlayersOrders>;
    requestDeserialize: grpc.deserialize<rl_assistant_pb.PlayersOrders>;
    responseSerialize: grpc.serialize<rl_assistant_pb.TurnOutcome>;
    responseDeserialize: grpc.deserialize<rl_assistant_pb.TurnOutcome>;
}
interface IRLAssistantService_IResetEnv extends grpc.MethodDefinition<rl_assistant_pb.RLResetConfig, rl_assistant_pb.TurnOutcome> {
    path: "/lugo.RLAssistant/ResetEnv";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<rl_assistant_pb.RLResetConfig>;
    requestDeserialize: grpc.deserialize<rl_assistant_pb.RLResetConfig>;
    responseSerialize: grpc.serialize<rl_assistant_pb.TurnOutcome>;
    responseDeserialize: grpc.deserialize<rl_assistant_pb.TurnOutcome>;
}

export const RLAssistantService: IRLAssistantService;

export interface IRLAssistantServer extends grpc.UntypedServiceImplementation {
    startSession: grpc.handleServerStreamingCall<rl_assistant_pb.RLSessionConfig, server_pb.GameSnapshot>;
    sendPlayersOrders: grpc.handleUnaryCall<rl_assistant_pb.PlayersOrders, rl_assistant_pb.TurnOutcome>;
    resetEnv: grpc.handleUnaryCall<rl_assistant_pb.RLResetConfig, rl_assistant_pb.TurnOutcome>;
}

export interface IRLAssistantClient {
    startSession(request: rl_assistant_pb.RLSessionConfig, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    startSession(request: rl_assistant_pb.RLSessionConfig, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    sendPlayersOrders(request: rl_assistant_pb.PlayersOrders, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    sendPlayersOrders(request: rl_assistant_pb.PlayersOrders, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    sendPlayersOrders(request: rl_assistant_pb.PlayersOrders, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    resetEnv(request: rl_assistant_pb.RLResetConfig, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    resetEnv(request: rl_assistant_pb.RLResetConfig, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    resetEnv(request: rl_assistant_pb.RLResetConfig, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
}

export class RLAssistantClient extends grpc.Client implements IRLAssistantClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public startSession(request: rl_assistant_pb.RLSessionConfig, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    public startSession(request: rl_assistant_pb.RLSessionConfig, metadata?: grpc.Metadata, options?: Partial<grpc.CallOptions>): grpc.ClientReadableStream<server_pb.GameSnapshot>;
    public sendPlayersOrders(request: rl_assistant_pb.PlayersOrders, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    public sendPlayersOrders(request: rl_assistant_pb.PlayersOrders, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    public sendPlayersOrders(request: rl_assistant_pb.PlayersOrders, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    public resetEnv(request: rl_assistant_pb.RLResetConfig, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    public resetEnv(request: rl_assistant_pb.RLResetConfig, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
    public resetEnv(request: rl_assistant_pb.RLResetConfig, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: rl_assistant_pb.TurnOutcome) => void): grpc.ClientUnaryCall;
}
