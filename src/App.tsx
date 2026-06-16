import { useState } from "react";
import "./App.css";
import { Loader } from "./components/loader";
import { Overworld } from "./components/overworld";
import { signInWithGoogle, useAuth } from "./lib/auth";
import { useCollection } from "./lib/firestore";
import { useTransaction } from "./lib/transaction";
import { charactersRef } from "./models/character";
import { createCharacterTransaction } from "./transactions/character";

function App() {
  const auth = useAuth();

  if (auth.isLoading) {
    return <Loader></Loader>;
  }

  if (auth.user === null) {
    return <button onClick={signInWithGoogle}>Sign in with Google</button>;
  }

  return <Game userUid={auth.user.uid}></Game>;
}

const Game: React.FC<{ userUid: string }> = (props) => {
  const characters = useCollection(charactersRef);
  const character = characters.snapshot?.docs.find(
    (d) => d.id === props.userUid,
  );

  if (characters.isLoading) {
    return <Loader></Loader>;
  }

  if (!character) {
    return <CreateCharacter userUid={props.userUid}></CreateCharacter>;
  }

  return <Overworld></Overworld>;
};

const CreateCharacter: React.FC<{ userUid: string }> = (props) => {
  const [name, setName] = useState("");
  const createCharacter = useTransaction(createCharacterTransaction);

  if (createCharacter.didBegin) {
    return <Loader></Loader>;
  }

  return (
    <div className="CreateCharacter">
      <label>Character Name</label>
      <input onChange={(event) => setName(event.currentTarget.value)}></input>
      <button
        disabled={name.trim().length === 0}
        onClick={() =>
          createCharacter.begin({
            userUid: props.userUid,
            name,
          })
        }
      >
        Create Character
      </button>
    </div>
  );
};

export default App;
