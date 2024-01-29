const ballPosition = inspector.getBall().getPosition();
const speed = 100; // or other speed

const runTowardsTheBallOrder = inspector.makeOrderMove(ballPosition, speed);
// or
const runTowardsTheBallOrder = inspector.makeOrderMoveMaxSpeed(ballPosition);