import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  type User,
} from "firebase/auth";
import { useEffect, useState } from "react";
import { firebase } from "./firebase";

const auth = getAuth(firebase);

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    auth.onAuthStateChanged(
      (user) => {
        setUser(user);
        setError(null);
        setIsLoading(false);
      },
      (error) => {
        setUser(null);
        setError(error);
        setIsLoading(false);
      },
    );
  }, []);

  return { isLoading, error, user };
};

export const signInWithGoogle = () => {
  return signInWithPopup(auth, new GoogleAuthProvider());
};
