const goal = this.mapper.getAttackGoal(); // or inspector.getDefenseGoal()
const goalCenter  = goal.getCenter();
const speed = SPECS.BALL_MAX_SPEED; // or other speed

const runTowardsTheGoalOrder = inspector.makeOrderMove(goalCenter, speed);
// or
const runTowardsTheGoalOrder = inspector.makeOrderMoveMaxSpeed(goalCenter);