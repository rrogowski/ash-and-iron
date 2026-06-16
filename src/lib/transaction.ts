import { runTransaction, type Transaction } from "firebase/firestore";
import { useCallback, useState } from "react";
import { firestore } from "./firestore";

type TransactionCallback<TArgs extends object, TReturn> = (
  t: Transaction,
  args: TArgs,
) => TReturn;

export const useTransaction = <TArgs extends object, TReturn>(
  callback: TransactionCallback<TArgs, TReturn>,
) => {
  const [didBegin, setDidBegin] = useState(false);
  const [isRunning, setIsRunning] = useState(false);

  const begin = useCallback(
    async (args: TArgs) => {
      setIsRunning(true);
      setDidBegin(true);
      try {
        return await runTransaction(firestore, async (t) => {
          return callback(t, args);
        });
      } finally {
        setIsRunning(false);
      }
    },
    [callback],
  );

  return { begin, didBegin, isRunning };
};
