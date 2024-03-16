const me = inspector.getMe();
const myCurrentRegion = this.mapper.getRegionFromPoint(me.getPosition());

const speed = SPECS.PLAYER_MAX_SPEED; // or other speed

// to back
const moveOrder = inspector.makeOrderMove(myCurrentRegion.back().getCenter(), speed);
// or to front
const moveOrder = inspector.makeOrderMove(myCurrentRegion.front().getCenter(), speed);
// or to right
const moveOrder = inspector.makeOrderMove(myCurrentRegion.right().getCenter(), speed);
// or to left
const moveOrder = inspector.makeOrderMove(myCurrentRegion.left().getCenter(), speed);

// you can combine regions to move more
const moveOrder = inspector.makeOrderMove(myCurrentRegion.left().front().front().getCenter(), speed);