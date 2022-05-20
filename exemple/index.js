const grpc = require('grpc');
const game_service = require("../pb/server_grpc_pb")
const game_msg = require("../pb/server_pb")
// const lugo = require("../pb/server_pb").lugo
const field = require("../field")
const {Client} = require('../client')
const process = require('process')
const GameSnapshotReader = require('../helpers').GameSnapshotReader
// const {Point} = require('../proto_wrapper.js')

// const stop = () => {
//     console.info("Interrupted")
//     process.exit(0)
// }
//
// process.on('SIGINT', stop);  // CTRL+C
// process.on('SIGQUIT', stop); // Keyboard quit
// process.on('SIGTERM', stop); // `kill` command

// let pos = new Point(
//     randomIntFromInterval(1, field.MAX_Y_COORDINATE),
//     randomIntFromInterval(1, field.MAX_X_COORDINATE / 2),
// );

let pos = new game_msg.Point({
    X: randomIntFromInterval(1, field.MAX_Y_COORDINATE),
    Y: randomIntFromInterval(1, field.MAX_X_COORDINATE / 2),
})
// pos.setX(randomIntFromInterval(1, field.MAX_Y_COORDINATE))
// pos.setY(randomIntFromInterval(1, field.MAX_X_COORDINATE / 2))

const mySide = game_msg.Team.Side[process.env.PLAYER_SIDE.toUpperCase()]
const myNumber = parseInt(process.env.PLAYER_NUMBER)

if (mySide === game_msg.Team.Side.AWAY) {
    pos.setX(field.MAX_X_COORDINATE - pos.getX())
    pos.setY(field.MAX_Y_COORDINATE - pos.getY())
}

bot = new Client(
    'localhost:5000',
    "",
    mySide,
    myNumber,
    pos,
)
console.log(mySide,
    myNumber,
    pos,)

/**
 * 
 * @param {proto.lugo.GameSnapshot} snapshot
 */
const myBot = (snapshot) => {
    try {
        const reader = new GameSnapshotReader(snapshot,mySide)
        // const myTeam = reader.getMyTeam()
        const me = reader.GetPlayer(mySide, myNumber)

        if(reader.IsBallHolder(me)) {
            console.log(`I AM THE HOLDER`)
        }

        console.log(`Center, other side, other goal`,
            reader.GetOpponentGoal().bottomPole.getX(),
            )
        // console.log(`my team`, myTeam)
    } catch (e) {
        console.log(e)
    }

}

bot.play(myBot).then(() => {
    console.log(`all done`)
}).catch(e => {
    console.error(e)
})

// const m = grpc.credentials.createInsecure()
// const client = new game_service.GameClient('localhost:5000', m)
// const deadline = new Date();
// deadline.setSeconds(deadline.getSeconds() + 2);
// client.waitForReady(deadline, (err) => {
//     if (err) {
//         console.error("failed to connect", err)
//         process.exit(1);
//     }
//     console.log(`connect to the gRPC server`)
//
//     const pos = new game_msg.Point();
//     pos.setX(randomIntFromInterval(1, field.MAX_Y_COORDINATE))
//     pos.setY(randomIntFromInterval(1, field.MAX_X_COORDINATE / 2))
//
//     console.log(`Postition: `, pos)
//     const req = new game_msg.JoinRequest()
//     req.setToken("")
//     req.setProtocolVersion("1.0.0")
//     req.setTeamSide(game_msg.Team.Side[process.env.PLAYER_SIDE.toUpperCase()])
//     req.setNumber(process.env.PLAYER_NUMBER)
//     req.setInitPosition(pos)
//     const running = client.joinATeam(req)
//     console.log(`joined to the team`)
//     running.on('data', function (response) {
//         console.log('data: ', response);
//     });
//     running.on('error', function(e) {
//         // An error has occurred and the stream has been closed.
//         console.log('error', e);
//     });
//     running.on('status', function(status) {
//         // process status
//         console.log('status', status);
//     });
//     running.on('end', function () {
//         console.log('communication done');
//     });
//
// })
//
function randomIntFromInterval(min, max) { // min and max included
    return Math.floor(Math.random() * (max - min + 1) + min)
}

// var packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
//
// const lugo = grpc.loadPackageDefinition(packageDefinition).lugo;
//
// const client = new lugo.Game(
//     "localhost:5000",
//     grpc.credentials.createInsecure()
// );