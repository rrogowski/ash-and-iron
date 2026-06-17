export interface OverworldMap {
  id: string;
  width: number;
  height: number;
  entities: OverworldEntityLocation[];
}

interface OverworldEntityLocation {
  id: string;
  x: number;
  y: number;
}

export const OVERWORLD_MAPS: OverworldMap[] = [
  {
    id: "Oldham Wood",
    width: 30,
    height: 30,
    entities: [
      { id: "Tree", x: 3, y: 3 },
      { id: "Tree", x: 4, y: 3 },
      { id: "Tree", x: 3, y: 4 },
      { id: "House", x: 4, y: 4 },
    ],
  },
];
