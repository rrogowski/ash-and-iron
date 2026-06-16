import { doc, type Transaction } from "firebase/firestore";
import { charactersRef } from "../models/character";

export const createCharacterTransaction = (
  t: Transaction,
  args: { userUid: string; name: string },
) => {
  const characterRef = doc(charactersRef, args.userUid);
  return t.set(characterRef, { name: args.name });
};
