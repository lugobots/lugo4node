class CoachStub {
    /**
     *
     * @returns {Promise<void>}
     */
    async setRandomState() {
    }

    /**
     *
     * @returns {Promise<tf.Tensor>}
     */
    async getStateTensor() {
    }

    /**
     *
     * @param action
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    async update(action) {
    }

    async stop() {
    }
}

class TrainableBot {
    /**
     *
     * @returns {Promise<proto.lugo.GameSnapshot>}
     */
    async createNewInitialState() {
    }

    /**
     *
     * @param {proto.lugo.GameSnapshot} snapshot
     * @returns {Promise<tf.Tensor>}
     */
    async getInputs(snapshot) {
    }

    async play(orderSet, snapshot, action) {
    }

    /**
     *
     * @param {proto.lugo.GameSnapshot} previousSnapshot
     * @param {proto.lugo.GameSnapshot} newSnapshot
     * @returns {Promise<{reward: number, done: boolean}>}
     */
    async evaluate(previousSnapshot, newSnapshot) {
    }
}

module.exports = {CoachStub, TrainableBot}