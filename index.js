const grpc = require('grpc');
const game_service = require("./pb/server_grpc_pb")
const game_msg = require("./pb/server_pb")

const process = require('process')
process.on('SIGINT', () => {
    console.info("Interrupted")
    process.exit(0)
})



const m = grpc.credentials.createInsecure()
const client = new game_service.GameClient('localhost:5000',  m)
const deadline = new Date();
deadline.setSeconds(deadline.getSeconds() + 2);
client.waitForReady(deadline, (err) => {
    if (err) {
        console.error("failed to connect", err)
        process.exit(1);
    }
    console.log(`connect to the gRPC server`)

    const req = new game_msg.JoinRequest()
    req.setToken("")
    req.setProtocolVersion("1.0.0")
    req.setTeamSide(game_msg.Team.Side[process.env.PLAYER_SIDE.toUpperCase()])
    req.setNumber(process.env.PLAYER_NUMBER)
    req.setInitPosition(new game_msg.Point())
    const running = client.joinATeam(req)
    console.log(`joined to the team`)
    running.on('data',function(response){
        console.log(response.message);
    });

    running.on('end',function(){
        console.log('All Salaries have been paid');
    });

})

// var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
//
// const lugo = grpc.loadPackageDefinition(packageDefinition).lugo;
//
// const client = new lugo.Game(
//     "localhost:5000",
//     grpc.credentials.createInsecure()
// );