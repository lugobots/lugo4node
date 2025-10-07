
// exposing all from server
import {GameSnapshot, Team} from "./pb/server_pb";

export * from './pb/server_pb.js'

export const {Side} = Team
export const {State} = GameSnapshot

// exposing all from broadcast
export * from './pb/broadcast_pb.js'
export * from './pb/remote_pb.js'
// exposing all from physics
export * from './pb/physics_pb.js'

export * from './pb/broadcast_grpc_pb.js'

export * from './pb/remote_grpc_pb.js'

export * from './pb/server_grpc_pb'
