const ballPosition = inspector.getBall().getPosition();
const speed = SPECS.BALL_MAX_SPEED; // or other speed

const runTowardsTheBallOrder = inspector.makeOrderMove(ballPosition, speed);
// or
const runTowardsTheBallOrder = inspector.makeOrderMoveMaxSpeed(ballPosition);