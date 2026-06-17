export interface OverworldEntity {
  id: string;
  icon?: string;
}

export const CHARACTER_ICON =
  "https://seiyria.com/gameicons-font/svg/character.svg";

export const EMPTY_SPACE: OverworldEntity = { id: "empty-space" };
export const MAP_BOUNDARY: OverworldEntity = { id: "map-boundary" };
export const OUT_OF_BOUNDS: OverworldEntity = { id: "out-of-bounds" };

export const OVERWORLD_ENTITIES: OverworldEntity[] = [
  EMPTY_SPACE,
  MAP_BOUNDARY,
  OUT_OF_BOUNDS,
  { id: "Tree", icon: "https://seiyria.com/gameicons-font/svg/pine-tree.svg" },
  { id: "House", icon: "https://seiyria.com/gameicons-font/svg/house.svg" },
];
