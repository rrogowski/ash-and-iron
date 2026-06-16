import { createCollectionRef } from "../lib/firestore";

interface CharacterModel {
  name: string;
}

export const charactersRef = createCollectionRef<CharacterModel>("characters");
