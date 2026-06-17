import { ITEMS } from "../data/items";

export const findItem = (id: string) => {
  const result = ITEMS.find((item) => item.id === id);
  if (!result) {
    throw Error(`item not found: ${id}`);
  }
  return result;
};
