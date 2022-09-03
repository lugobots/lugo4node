export class RemoteControl {
    connect(grpcAddress: any): Promise<void>;
    pauseResume(): Promise<any>;
    nextTurn(): Promise<any>;
    /**
     *
     * @param {proto.lugo.Point} position
     * @param {proto.lugo.Velocity} velocity
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    setBallProps(position: proto.lugo.Point, velocity: proto.lugo.Velocity): Promise<proto.lugo.GameSnapshot>;
    setPlayerProps(teamSide: any, playerNumber: any, newPosition: any, newVelocity: any): Promise<any>;
    setTurn(turnNumber: any): Promise<any>;
    #private;
}
