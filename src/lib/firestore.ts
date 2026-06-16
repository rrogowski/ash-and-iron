import {
  collection,
  getFirestore,
  onSnapshot,
  QuerySnapshot,
  type CollectionReference,
  type DocumentData,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebase } from "./firebase";

export const firestore = getFirestore(firebase);

export const createCollectionRef = <T extends DocumentData>(path: string) => {
  return collection(firestore, path) as CollectionReference<T>;
};

export const useCollection = <T extends DocumentData>(
  ref: CollectionReference<T>,
) => {
  const [isLoading, setIsLoading] = useState(true);
  const [snapshot, setSnapshot] = useState<QuerySnapshot<T>>();

  useEffect(() => {
    onSnapshot(ref, (s) => {
      setSnapshot(s);
      setIsLoading(false);
    });
  }, [ref]);

  return { isLoading, snapshot };
};
