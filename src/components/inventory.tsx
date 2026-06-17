import type { QueryDocumentSnapshot } from "firebase/firestore";
import { findItem } from "../lib/item";
import type { CharacterModel } from "../models/character";
import "./inventory.css";

export const Inventory: React.FC<{
  character: QueryDocumentSnapshot<CharacterModel>;
}> = (props) => {
  const character = props.character.data();
  return (
    <div className="Inventory">
      {character.inventory.map(({ id, quantity }) => {
        const item = findItem(id);
        return (
          <div key={id} className="slot">
            <img src={item.icon}></img>
            {quantity > 1 && <span className="quantity">{quantity}</span>}
          </div>
        );
      })}
    </div>
  );
};
