import type { InventoryModel } from "../models/character";

export const hasItem = (inventory: InventoryModel, id: string) => {
  return inventory.some((item) => item.id === id);
};
