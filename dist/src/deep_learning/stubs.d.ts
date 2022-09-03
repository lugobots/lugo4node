export class CoachStub {
    /**
     *
     * @returns {Promise<void>}
     */
    setRandomState(): Promise<void>;
    /**
     *
     * @returns {Promise<tf.Tensor>}
     */
    getStateTensor(): Promise<tf.Tensor>;
    /**
     *
     * @param action
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    update(action: any): Promise<{
        reward: number;
        done: boolean;
    }>;
    stop(): Promise<void>;
}
export class TrainableBot {
    /**
     *
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    createNewInitialState(): Promise<proto.lugo.GameSnapshot>;
    /**
     *
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {Promise<tf.Tensor>}
     */
    getInputs(snapshot: proto.lugo.GameSnapshot): Promise<tf.Tensor>;
    play(orderSet: any, snapshot: any, action: any): Promise<void>;
    /**
     *
     * @param {proto.lugo.GameSnapshot} previousSnapshot
     * @param {proto.lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    evaluate(previousSnapshot: proto.lugo.GameSnapshot, newSnapshot: proto.lugo.GameSnapshot): Promise<{
        reward: number;
        done: boolean;
    }>;
}
