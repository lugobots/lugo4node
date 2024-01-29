import { DIRECTION, Goal } from '.';
import * as Geo from './geo';
import { AWAY_GOAL, HOME_GOAL } from './goal';
import * as Helpers from "./helpers";
import * as ORIENTATION from './orentation';
import * as Lugo from './proto_exported';
import { SPECS } from "./specs";

export default class GameSnapshotInspector {
    mySide: Lugo.Team.Side;
    myNumber: number;
    me: Lugo.Player;
    snapshot: Lugo.GameSnapshot;

    constructor(botSide: Lugo.Team.Side, playerNumber: number, gameSnapshot: Lugo.GameSnapshot) {
        this.mySide = botSide;
        this.myNumber = playerNumber;
        this.snapshot = gameSnapshot;

        this.me = this.getPlayer(botSide, playerNumber);
        if (!this.me) {
            throw new Error(`Could not find the player ${botSide}-${playerNumber}`);
        }
    }

    getSnapshot(): Lugo.GameSnapshot | null {
        return this.snapshot;
    }

    getTurn() : number {
        return this.snapshot.getTurn();
    }

    getMe(): Lugo.Player {
        return this.me;
    }

    getBall(): Lugo.Ball | null {
        return this.snapshot?.getBall() ?? null;
    }

	getPlayer(side: Lugo.Team.Side, number: number): Lugo.Player | null {
        return Helpers.getPlayer(this.snapshot, side, number);
    }

	getBallHolder(): Lugo.Player | null {
        return Helpers.getBallHolder(this.snapshot);
    }

    isBallHolder(player: Lugo.Player): boolean {
        return Helpers.isBallHolder(this.snapshot, player);
    }

    getTeam(side: Lugo.Team.Side): Lugo.Team | null {
        return Helpers.getTeam(this.snapshot, side);
    }

    getMyTeam(): Lugo.Team | null {
        return this.getTeam(this.mySide);
    }

    getOpponentTeam(): Lugo.Team | null {
        return this.getTeam(this.getOpponentSide());
    }

    getMyTeamSide(): Lugo.Team.Side {
        return this.mySide;
    }

    getOpponentSide(): Lugo.Team.Side {
        return Helpers.getOpponentSide(this.mySide);
    }

    getMyTeamPlayers(): Lugo.Player[] {
        const myTeam = this.getMyTeam();
        return myTeam ? myTeam.getPlayersList() : [];
    }

    getOpponentPlayers(): Lugo.Player[] {
        const opponentTeam = this.getOpponentTeam();
        return opponentTeam ? opponentTeam.getPlayersList() : [];
    }

    getMyTeamGoalkeeper(): Lugo.Player | null {
        return this.getPlayer(this.getMyTeamSide(), SPECS.GOALKEEPER_NUMBER);
    }

    getOpponentGoalkeeper(): Lugo.Player | null {
        return this.getPlayer(this.getOpponentSide(), SPECS.GOALKEEPER_NUMBER);
    }

    makeOrderMove(target: Lugo.Point, speed: number): Lugo.Order {
        return this.makeOrderMoveFromPoint(this.me?.getPosition() ?? Geo.newZeroedPoint(), target, speed);
    }

    makeOrderMoveMaxSpeed(target: Lugo.Point): Lugo.Order {
        return this.makeOrderMoveFromPoint(this.me?.getPosition() ?? Geo.newZeroedPoint(), target, SPECS.PLAYER_MAX_SPEED);
    }

	makeOrderMoveFromPoint(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order {
        const vec: Lugo.Vector = Geo.NewVector(origin, target);
        const vel: Lugo.Velocity = Geo.NewZeroedVelocity(Geo.normalize(vec));
        vel.setSpeed(speed);
        const moveOrder = new Lugo.Move()
        moveOrder.setVelocity(vel)
        return new Lugo.Order().setMove(moveOrder);
    }

    makeOrderMoveFromVector(direction: Lugo.Vector, speed: number): Lugo.Order {
        const targetPoint: Lugo.Point = Geo.TargetFrom(direction, this.me?.getPosition() ?? Geo.newZeroedPoint());
        return this.makeOrderMoveFromPoint(this.me?.getPosition() ?? Geo.newZeroedPoint(), targetPoint, speed);
    }

    makeOrderMoveByDirection(direction: DIRECTION, speed?: number): Lugo.Order {
        const directionTarget = this.getOrientationByDirection(direction);
        return this.makeOrderMoveFromVector(directionTarget, speed ?? SPECS.PLAYER_MAX_SPEED);
    }

    makeOrderMoveToStop(): Lugo.Order {
        const myDirection: Lugo.Vector | null = this.getMe()?.getVelocity()?.getDirection() ?? this.getOrientationByDirection(DIRECTION.FORWARD);
        return this.makeOrderMoveFromVector(myDirection, 0);
    }

    makeOrderJump(target: Lugo.Point, speed: number): Lugo.Order {
        const vec: Lugo.Vector = Geo.NewVector(this.me?.getPosition() ?? Geo.newZeroedPoint(), target);
        const vel: Lugo.Velocity = Geo.NewZeroedVelocity(Geo.normalize(vec));
        vel.setSpeed(speed);

        const jump = new Lugo.Jump();
        jump.setVelocity(vel);

        return new Lugo.Order().setJump(jump);
    }

    makeOrderKick(target: Lugo.Point, speed: number): Lugo.Order {
        const ballExpectedDirection: Lugo.Vector = Geo.NewVector(this.snapshot?.getBall()?.getPosition() ?? Geo.newZeroedPoint(), target);
        const diffVector: Lugo.Vector =  Geo.subVector(ballExpectedDirection, this.snapshot?.getBall()?.getVelocity()?.getDirection() ?? Geo.newZeroedPoint());
        const vel: Lugo.Velocity = Geo.NewZeroedVelocity(Geo.normalize(diffVector));
        vel.setSpeed(speed);

        const kick = new Lugo.Kick();
        kick.setVelocity(vel);

        return new Lugo.Order().setKick(kick);
    }

    makeOrderKickMaxSpeed(target: Lugo.Point): Lugo.Order {
        return this.makeOrderKick(target, SPECS.BALL_MAX_SPEED);
    }

    makeOrderCatch(): Lugo.Order {
        const catchOrder = new Lugo.Catch();
        return new Lugo.Order().setCatch(catchOrder);
    }


    private getOrientationByDirection(direction: DIRECTION) {
        let directionTarget : Lugo.Vector;
        switch (direction) {
            case DIRECTION.FORWARD:
                directionTarget = ORIENTATION.EAST
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.WEST
                }
                break;
            case DIRECTION.BACKWARD:
                directionTarget = ORIENTATION.WEST
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.EAST
                }
                break;
            case DIRECTION.LEFT:
                directionTarget = ORIENTATION.NORTH
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH
                }
                break;
            case DIRECTION.RIGHT:
                directionTarget = ORIENTATION.SOUTH
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH
                }
                break;
            case DIRECTION.BACKWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_WEST
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_EAST
                }
                break;
            case DIRECTION.BACKWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_WEST
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_EAST
                }
                break;
            case DIRECTION.FORWARD_LEFT:
                directionTarget = ORIENTATION.NORTH_EAST
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.SOUTH_WEST
                }
                break;
            case DIRECTION.FORWARD_RIGHT:
                directionTarget = ORIENTATION.SOUTH_EAST
                if (this.mySide === Lugo.Team.Side.AWAY) {
                    directionTarget = ORIENTATION.NORTH_WEST
                }
                break;
            default:
                throw new Error(`unknown direction ${direction}`)
        }
        return directionTarget;
    }
}



