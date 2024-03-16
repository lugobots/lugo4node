mapper.getDefenseGoal(): Goal
mapper.getAttackGoal(): Goal
mapper.getRegion(col: number, row: number): Region
mapper.getRegionFromPoint(point: Lugo.Point): Region

region.eq(region: Region): boolean
region.getCol(): number
region.getRow(): number
region.getCenter(): physics.Point
region.toString(): string
region.front(): Region
region.back(): Region
region.left(): Region
region.right(): Region