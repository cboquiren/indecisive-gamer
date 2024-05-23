import { Transform } from "../Assets/transformations";
import { TGame } from "../Assets/types";

export const Tags = ({ game, label }: { game: TGame; label: string }) => {
  return (
    <div className="tag-container">
      <h3
        className="nes-text is-success"
        id={`${label}-title`}
      >{`${Transform.capitalize(label)}s:`}</h3>
      <div className="badge-container" id={label}>
        {label === "genre" &&
          Transform.shuffle(
            game.genres
              .map((genre) => genre.name)
              .map((val) => {
                return (
                  <div className="badge" key={`${label}-${val}`}>
                    <p>{val}</p>
                  </div>
                );
              })
          )}
        {label === "platform" &&
          Transform.shuffle(
            game.platforms
              .map((platform) => platform.name)
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
