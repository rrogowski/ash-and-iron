import type { QueryDocumentSnapshot } from "firebase/firestore";
import { Fragment } from "react";
import {
  CHARACTER_ICON,
  EMPTY_SPACE,
  MAP_BOUNDARY,
  OUT_OF_BOUNDS,
} from "../data/overworld-entities";
import { findOverworldMap, getMapEntity } from "../lib/overworld";
import { useTransaction } from "../lib/transaction";
import type { CharacterModel } from "../models/character";
import { moveCharacterTransaction } from "../transactions/character";
import "./overworld.css";

export const Overworld: React.FC<{
  character: QueryDocumentSnapshot<CharacterModel>;
}> = (props) => {
  const character = props.character.data();
  const map = findOverworldMap(character.location.id);
  const viewportOrigin = {
    x: character.location.x - 4,
    y: character.location.y - 4,
  };

  const moveCharacter = useTransaction(moveCharacterTransaction);

  return (
    <div className="Overworld">
      {Array.from({ length: 9 }).map((_, yOffset) => {
        return (
          <Fragment key={`row-${yOffset}`}>
            {Array.from({ length: 9 }).map((_, xOffset) => {
              const x = viewportOrigin.x + xOffset;
              const y = viewportOrigin.y + yOffset;
              const entity = getMapEntity(map, x, y);
              console.log(x, y, entity);
              return (
                <div key={`column-${xOffset}`} className="tile">
                  {entity === EMPTY_SPACE ? (
                    <div
                      className="empty-space"
                      onClick={() =>
                        moveCharacter.begin({
                          userUid: props.character.id,
                          x,
                          y,
                        })
                      }
                    >
                      &nbsp;
                    </div>
                  ) : entity === MAP_BOUNDARY ? (
                    <div className="map-boundary">&nbsp;</div>
                  ) : entity === OUT_OF_BOUNDS ? (
                    <div className="out-of-bounds">&nbsp;</div>
                  ) : (
                    <div
                      onClick={() =>
                        moveCharacter.begin({
                          userUid: props.character.id,
                          x,
                          y,
                        })
                      }
                    >
                      <img src={entity.icon}></img>
                    </div>
                  )}
                  {character.location.x === x && character.location.y === y && (
                    <img className="character" src={CHARACTER_ICON}></img>
                  )}
                </div>
              );
            })}
          </Fragment>
        );
      })}
    </div>
  );
};
