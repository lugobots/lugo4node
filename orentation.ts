import {Vector} from './pb/physics_pb'
import * as vectors from './vector'


export const EAST = vectors.normalize(new Vector().setX(1))
export const WEST = vectors.normalize(new Vector().setX(-1))
export const SOUTH = vectors.normalize(new Vector().setY(-1))
export const NORTH = vectors.normalize(new Vector().setY(1))

export const NORTH_EAST = vectors.normalize(new Vector().setX(1).setY(1))
export const NORTH_WEST = vectors.normalize(new Vector().setX(-1).setY(1))
export const SOUTH_EAST = vectors.normalize(new Vector().setX(1).setY(-1))
export const SOUTH_WEST = vectors.normalize(new Vector().setX(-1).setY(-1))




