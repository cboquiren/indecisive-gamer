import { Transform } from "../Assets/transformations";
import { TGame } from "../Assets/types";

export const Tags = ({
  game,
  label,
  dataArr,
}: {
  game: TGame;
  label: string;
  dataArr: string[];
}) => {
  return (
    <div className="tag-container">
      <h3 className="nes-text is-success" id={`${label}-title`}>{`${Transform.capitalize(
        label
      )}s:`}</h3>
      <div className="badge-container" id={label}>
        {Transform.shuffle(
          Object.values(game)
            .filter((value) => {
              return typeof value === "string" ? dataArr.includes(value) : false;
            })
            .map((val) => {
              return (
                <div className="badge" key={`${label}-${val}`}>
                  <p>{val}</p>
                </div>
              );
            })
        )}
      </div>
    </div>
  );
};
