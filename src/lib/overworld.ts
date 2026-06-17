import {
  EMPTY_SPACE,
  MAP_BOUNDARY,
  OUT_OF_BOUNDS,
  OVERWORLD_ENTITIES,
} from "../data/overworld-entities";
import { OVERWORLD_MAPS, type OverworldMap } from "../data/overworld-maps";

export const findOverworldMap = (id: string) => {
  const result = OVERWORLD_MAPS.find((map) => map.id === id);
  if (!result) {
    throw Error(`map not found: ${id}`);
  }
  return result;
};

export const findOverworldEntity = (id: string) => {
  const result = OVERWORLD_ENTITIES.find((entity) => entity.id === id);
  if (!result) {
    throw Error(`entity not found: ${id}`);
  }
  return result;
};

export const getMapEntity = (map: OverworldMap, x: number, y: number) => {
  if (x < 0 || y < 0 || x >= map.width || y >= map.height) {
    return OUT_OF_BOUNDS;
  }
  if (x === 0 || y === 0 || x === map.width - 1 || y === map.height - 1) {
    return MAP_BOUNDARY;
  }
  const entity = map.entities.find(
    (entity) => entity.x === x && entity.y === y,
  );
  if (entity) {
    return findOverworldEntity(entity.id);
  }
  return EMPTY_SPACE;
};
