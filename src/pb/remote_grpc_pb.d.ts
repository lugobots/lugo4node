// package: lugo
// file: remote.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as remote_pb from "./remote_pb";
import * as physics_pb from "./physics_pb";
import * as server_pb from "./server_pb";

interface IRemoteService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    pauseOrResume: IRemoteService_IPauseOrResume;
    nextTurn: IRemoteService_INextTurn;
    nextOrder: IRemoteService_INextOrder;
    setBallProperties: IRemoteService_ISetBallProperties;
    setPlayerProperties: IRemoteService_ISetPlayerProperties;
    setGameProperties: IRemoteService_ISetGameProperties;
    resumeListeningPhase: IRemoteService_IResumeListeningPhase;
    resetPlayerPositions: IRemoteService_IResetPlayerPositions;
    getGameSnapshot: IRemoteService_IGetGameSnapshot;
}

interface IRemoteService_IPauseOrResume extends grpc.MethodDefinition<remote_pb.PauseResumeRequest, remote_pb.CommandResponse> {
    path: "/lugo.Remote/PauseOrResume";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.PauseResumeRequest>;
    requestDeserialize: grpc.deserialize<remote_pb.PauseResumeRequest>;
    responseSerialize: grpc.serialize<remote_pb.CommandResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.CommandResponse>;
}
interface IRemoteService_INextTurn extends grpc.MethodDefinition<remote_pb.NextTurnRequest, remote_pb.CommandResponse> {
    path: "/lugo.Remote/NextTurn";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.NextTurnRequest>;
    requestDeserialize: grpc.deserialize<remote_pb.NextTurnRequest>;
    responseSerialize: grpc.serialize<remote_pb.CommandResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.CommandResponse>;
}
interface IRemoteService_INextOrder extends grpc.MethodDefinition<remote_pb.NextOrderRequest, remote_pb.CommandResponse> {
    path: "/lugo.Remote/NextOrder";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.NextOrderRequest>;
    requestDeserialize: grpc.deserialize<remote_pb.NextOrderRequest>;
    responseSerialize: grpc.serialize<remote_pb.CommandResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.CommandResponse>;
}
interface IRemoteService_ISetBallProperties extends grpc.MethodDefinition<remote_pb.BallProperties, remote_pb.CommandResponse> {
    path: "/lugo.Remote/SetBallProperties";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.BallProperties>;
    requestDeserialize: grpc.deserialize<remote_pb.BallProperties>;
    responseSerialize: grpc.serialize<remote_pb.CommandResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.CommandResponse>;
}
interface IRemoteService_ISetPlayerProperties extends grpc.MethodDefinition<remote_pb.PlayerProperties, remote_pb.CommandResponse> {
    path: "/lugo.Remote/SetPlayerProperties";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.PlayerProperties>;
    requestDeserialize: grpc.deserialize<remote_pb.PlayerProperties>;
    responseSerialize: grpc.serialize<remote_pb.CommandResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.CommandResponse>;
}
interface IRemoteService_ISetGameProperties extends grpc.MethodDefinition<remote_pb.GameProperties, remote_pb.CommandResponse> {
    path: "/lugo.Remote/SetGameProperties";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.GameProperties>;
    requestDeserialize: grpc.deserialize<remote_pb.GameProperties>;
    responseSerialize: grpc.serialize<remote_pb.CommandResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.CommandResponse>;
}
interface IRemoteService_IResumeListeningPhase extends grpc.MethodDefinition<remote_pb.ResumeListeningRequest, remote_pb.ResumeListeningResponse> {
    path: "/lugo.Remote/ResumeListeningPhase";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.ResumeListeningRequest>;
    requestDeserialize: grpc.deserialize<remote_pb.ResumeListeningRequest>;
    responseSerialize: grpc.serialize<remote_pb.ResumeListeningResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.ResumeListeningResponse>;
}
interface IRemoteService_IResetPlayerPositions extends grpc.MethodDefinition<remote_pb.ResetPlayerPositionsRequest, remote_pb.ResetPlayerPositionsResponse> {
    path: "/lugo.Remote/ResetPlayerPositions";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.ResetPlayerPositionsRequest>;
    requestDeserialize: grpc.deserialize<remote_pb.ResetPlayerPositionsRequest>;
    responseSerialize: grpc.serialize<remote_pb.ResetPlayerPositionsResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.ResetPlayerPositionsResponse>;
}
interface IRemoteService_IGetGameSnapshot extends grpc.MethodDefinition<remote_pb.GameSnapshotRequest, remote_pb.GameSnapshotResponse> {
    path: "/lugo.Remote/GetGameSnapshot";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<remote_pb.GameSnapshotRequest>;
    requestDeserialize: grpc.deserialize<remote_pb.GameSnapshotRequest>;
    responseSerialize: grpc.serialize<remote_pb.GameSnapshotResponse>;
    responseDeserialize: grpc.deserialize<remote_pb.GameSnapshotResponse>;
}

export const RemoteService: IRemoteService;

export interface IRemoteServer extends grpc.UntypedServiceImplementation {
    pauseOrResume: grpc.handleUnaryCall<remote_pb.PauseResumeRequest, remote_pb.CommandResponse>;
    nextTurn: grpc.handleUnaryCall<remote_pb.NextTurnRequest, remote_pb.CommandResponse>;
    nextOrder: grpc.handleUnaryCall<remote_pb.NextOrderRequest, remote_pb.CommandResponse>;
    setBallProperties: grpc.handleUnaryCall<remote_pb.BallProperties, remote_pb.CommandResponse>;
    setPlayerProperties: grpc.handleUnaryCall<remote_pb.PlayerProperties, remote_pb.CommandResponse>;
    setGameProperties: grpc.handleUnaryCall<remote_pb.GameProperties, remote_pb.CommandResponse>;
    resumeListeningPhase: grpc.handleUnaryCall<remote_pb.ResumeListeningRequest, remote_pb.ResumeListeningResponse>;
    resetPlayerPositions: grpc.handleUnaryCall<remote_pb.ResetPlayerPositionsRequest, remote_pb.ResetPlayerPositionsResponse>;
    getGameSnapshot: grpc.handleUnaryCall<remote_pb.GameSnapshotRequest, remote_pb.GameSnapshotResponse>;
}

export interface IRemoteClient {
    pauseOrResume(request: remote_pb.PauseResumeRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    pauseOrResume(request: remote_pb.PauseResumeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    pauseOrResume(request: remote_pb.PauseResumeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    nextTurn(request: remote_pb.NextTurnRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    nextTurn(request: remote_pb.NextTurnRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    nextTurn(request: remote_pb.NextTurnRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    nextOrder(request: remote_pb.NextOrderRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    nextOrder(request: remote_pb.NextOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    nextOrder(request: remote_pb.NextOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setBallProperties(request: remote_pb.BallProperties, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setBallProperties(request: remote_pb.BallProperties, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setBallProperties(request: remote_pb.BallProperties, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setPlayerProperties(request: remote_pb.PlayerProperties, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setPlayerProperties(request: remote_pb.PlayerProperties, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setPlayerProperties(request: remote_pb.PlayerProperties, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setGameProperties(request: remote_pb.GameProperties, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setGameProperties(request: remote_pb.GameProperties, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    setGameProperties(request: remote_pb.GameProperties, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    resumeListeningPhase(request: remote_pb.ResumeListeningRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.ResumeListeningResponse) => void): grpc.ClientUnaryCall;
    resumeListeningPhase(request: remote_pb.ResumeListeningRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.ResumeListeningResponse) => void): grpc.ClientUnaryCall;
    resumeListeningPhase(request: remote_pb.ResumeListeningRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.ResumeListeningResponse) => void): grpc.ClientUnaryCall;
    resetPlayerPositions(request: remote_pb.ResetPlayerPositionsRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.ResetPlayerPositionsResponse) => void): grpc.ClientUnaryCall;
    resetPlayerPositions(request: remote_pb.ResetPlayerPositionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.ResetPlayerPositionsResponse) => void): grpc.ClientUnaryCall;
    resetPlayerPositions(request: remote_pb.ResetPlayerPositionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.ResetPlayerPositionsResponse) => void): grpc.ClientUnaryCall;
    getGameSnapshot(request: remote_pb.GameSnapshotRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.GameSnapshotResponse) => void): grpc.ClientUnaryCall;
    getGameSnapshot(request: remote_pb.GameSnapshotRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.GameSnapshotResponse) => void): grpc.ClientUnaryCall;
    getGameSnapshot(request: remote_pb.GameSnapshotRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.GameSnapshotResponse) => void): grpc.ClientUnaryCall;
}

export class RemoteClient extends grpc.Client implements IRemoteClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public pauseOrResume(request: remote_pb.PauseResumeRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public pauseOrResume(request: remote_pb.PauseResumeRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public pauseOrResume(request: remote_pb.PauseResumeRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public nextTurn(request: remote_pb.NextTurnRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public nextTurn(request: remote_pb.NextTurnRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public nextTurn(request: remote_pb.NextTurnRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public nextOrder(request: remote_pb.NextOrderRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public nextOrder(request: remote_pb.NextOrderRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public nextOrder(request: remote_pb.NextOrderRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setBallProperties(request: remote_pb.BallProperties, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setBallProperties(request: remote_pb.BallProperties, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setBallProperties(request: remote_pb.BallProperties, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setPlayerProperties(request: remote_pb.PlayerProperties, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setPlayerProperties(request: remote_pb.PlayerProperties, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setPlayerProperties(request: remote_pb.PlayerProperties, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setGameProperties(request: remote_pb.GameProperties, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setGameProperties(request: remote_pb.GameProperties, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public setGameProperties(request: remote_pb.GameProperties, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.CommandResponse) => void): grpc.ClientUnaryCall;
    public resumeListeningPhase(request: remote_pb.ResumeListeningRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.ResumeListeningResponse) => void): grpc.ClientUnaryCall;
    public resumeListeningPhase(request: remote_pb.ResumeListeningRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.ResumeListeningResponse) => void): grpc.ClientUnaryCall;
    public resumeListeningPhase(request: remote_pb.ResumeListeningRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.ResumeListeningResponse) => void): grpc.ClientUnaryCall;
    public resetPlayerPositions(request: remote_pb.ResetPlayerPositionsRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.ResetPlayerPositionsResponse) => void): grpc.ClientUnaryCall;
    public resetPlayerPositions(request: remote_pb.ResetPlayerPositionsRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.ResetPlayerPositionsResponse) => void): grpc.ClientUnaryCall;
    public resetPlayerPositions(request: remote_pb.ResetPlayerPositionsRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.ResetPlayerPositionsResponse) => void): grpc.ClientUnaryCall;
    public getGameSnapshot(request: remote_pb.GameSnapshotRequest, callback: (error: grpc.ServiceError | null, response: remote_pb.GameSnapshotResponse) => void): grpc.ClientUnaryCall;
    public getGameSnapshot(request: remote_pb.GameSnapshotRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: remote_pb.GameSnapshotResponse) => void): grpc.ClientUnaryCall;
    public getGameSnapshot(request: remote_pb.GameSnapshotRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: remote_pb.GameSnapshotResponse) => void): grpc.ClientUnaryCall;
}
