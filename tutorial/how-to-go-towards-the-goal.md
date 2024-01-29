const goal = this.mapper.getAttackGoal(); // or inspector.getDefenseGoal()
const goalCenter  = goal.getCenter();
const speed = 100; // or other speed

const runTowardsTheGoalOrder = inspector.makeOrderMove(goalCenter, speed);
// or
const runTowardsTheGoalOrder = inspector.makeOrderMoveMaxSpeed(goalCenter);