import { Point, Velocity } from "../pb/physics_pb";
import { GameSnapshot, Team } from "../pb/server_pb";
export declare class RemoteControl {
    private client;
    constructor();
    connect(grpcAddress: string): Promise<void>;
    pauseResume(): Promise<void>;
    resumeListening(): Promise<void>;
    nextTurn(): Promise<void>;
    setBallProps(position: Point, velocity: Velocity): Promise<GameSnapshot>;
    setPlayerProps(teamSide: Team.Side, playerNumber: number, newPosition: Point, newVelocity: Velocity): Promise<GameSnapshot>;
    setTurn(turnNumber: any): Promise<GameSnapshot>;
}
