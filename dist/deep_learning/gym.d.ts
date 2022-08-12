export class Gym {
    /**
     *
     * @param {RemoteControl} remoteControl
     * @param trainableBot
     * @param {function(CoachStub):Promise} trainingFunction
     */
    constructor(remoteControl: RemoteControl, trainableBot: any, trainingFunction: (arg0: CoachStub) => Promise<any>, options?: {
        debugging_log: boolean;
    });
    start(lugoClient: any): Promise<void>;
    withZombiePlayers(gameServerAddress: any): Gym;
    #private;
}
