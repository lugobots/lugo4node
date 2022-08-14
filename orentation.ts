import {Vector} from './pb/physics_pb.js'
import * as geo from './geo.js'


export const EAST = geo.normalize(new Vector().setX(1))
export const WEST = geo.normalize(new Vector().setX(-1))
export const SOUTH = geo.normalize(new Vector().setY(-1))
export const NORTH = geo.normalize(new Vector().setY(1))

export const NORTH_EAST = geo.normalize(new Vector().setX(1).setY(1))
export const NORTH_WEST = geo.normalize(new Vector().setX(-1).setY(1))
export const SOUTH_EAST = geo.normalize(new Vector().setX(1).setY(-1))
export const SOUTH_WEST = geo.normalize(new Vector().setX(-1).setY(-1))




