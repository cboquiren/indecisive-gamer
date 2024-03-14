import { TGame } from "../Assets/types";
import { useSelected } from "../Providers/SelectedProvider";

export const PreviewSimilar = ({
  title,
  gameArr,
}: {
  title: string;
  gameArr: TGame[] | undefined;
}) => {
  const { setSelectedGame } = useSelected();
  return (
    <div className="nes-container is-rounded with-title preview-container">
      <h1 className="title" id="preview-title">
        {title}
      </h1>
      <div className="preview-card-container">
        {gameArr !== undefined &&
          gameArr.map((game) => {
            return (
              <div
                className="nes-container is-rounded with-title is-centered preview-card"
                onClick={() => {
                  setSelectedGame(game);
                }}
                key={`${game.name}-preview`}
              >
                <h1 className="title">{game.name}</h1>
                <div className="img-container">
                  <img src={game.image} alt={`${game.name} box art`} />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
