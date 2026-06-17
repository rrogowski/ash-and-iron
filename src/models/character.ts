import { createCollectionRef } from "../lib/firestore";

export interface CharacterModel {
  inventory: InventoryModel;
  location: LocationModel;
  name: string;
}

export type InventoryModel = { id: string; quantity: number }[];

export interface LocationModel {
  id: string;
  x: number;
  y: number;
}

export const charactersRef = createCollectionRef<CharacterModel>("characters");
