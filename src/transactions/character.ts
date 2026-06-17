import { doc, type Transaction } from "firebase/firestore";
import { charactersRef } from "../models/character";

export const createCharacterTransaction = (
  t: Transaction,
  args: { userUid: string; name: string },
) => {
  const characterRef = doc(charactersRef, args.userUid);
  return t.set(characterRef, {
    inventory: [],
    location: { id: "Oldham Wood", x: 1, y: 1 },
    name: args.name,
  });
};

export const moveCharacterTransaction = (
  t: Transaction,
  args: { userUid: string; x: number; y: number },
) => {
  const characterRef = doc(charactersRef, args.userUid);
  return t.update(characterRef, {
    "location.x": args.x,
    "location.y": args.y,
  });
};
