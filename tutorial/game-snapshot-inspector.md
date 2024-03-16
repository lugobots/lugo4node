inspector.getSnapshot(): Lugo.GameSnapshot | null
inspector.getTurn(): number
inspector.getMe(): Lugo.Player
inspector.getBall(): Lugo.Ball | null
inspector.getPlayer(side: Lugo.Team.Side, number: number): Lugo.Player | null
inspector.getBallHolder(): Lugo.Player | null
inspector.isBallHolder(player: Lugo.Player): boolean
inspector.getTeam(side: Lugo.Team.Side): Lugo.Team | null
inspector.getMyTeam(): Lugo.Team | null
inspector.getOpponentTeam(): Lugo.Team | null
inspector.getMyTeamSide(): Lugo.Team.Side
inspector.getOpponentSide(): Lugo.Team.Side
inspector.getMyTeamPlayers(): Lugo.Player[] 
inspector.getOpponentPlayers(): Lugo.Player[]
inspector.getMyTeamGoalkeeper(): Lugo.Player | null
inspector.getOpponentGoalkeeper(): Lugo.Player | null

inspector.makeOrderMove(target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderMoveMaxSpeed(target: Lugo.Point): Lugo.Order
inspector.makeOrderMoveFromPoint(origin: Lugo.Point, target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderMoveFromVector(direction: Lugo.Vector, speed: number): Lugo.Order
inspector.makeOrderMoveByDirection(direction: DIRECTION, speed?: number): Lugo.Order
inspector.makeOrderMoveToStop(): Lugo.Order
inspector.makeOrderJump(target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderKick(target: Lugo.Point, speed: number): Lugo.Order
inspector.makeOrderKickMaxSpeed(target: Lugo.Point): Lugo.Order
inspector.makeOrderCatch(): Lugo.Order