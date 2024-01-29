const goalPoint = inspector.getBall().getPosition(); // or other point
const speed = 100; // or other speed
const me = inspector.getMe();
const directionToPoint = geo.normalize(geo.NewVector(me.getPosition(), goalPoint))

const moveOrder = inspector.makeOrderMove(goalPoint, speed);
// or
const moveOrder = inspector.makeOrderMoveByDirection(DIRECTION.FORWARD, speed);
// or
const moveOrder = inspector.makeOrderMoveFromPoint(me.getPosition(), goalPoint, speed);
// or
const moveOrder = inspector.makeOrderMoveFromVector(directionToPoint, speed);
// or
const moveOrder = inspector.makeOrderMoveMaxSpeed(goalPoint);
// or
const moveOrder = inspector.makeOrderMoveToStop();