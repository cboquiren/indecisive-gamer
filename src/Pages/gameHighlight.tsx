import { Transform } from "../Assets/transformations";
import { EmptyResult } from "../Components/emptyResult";
import { PreviewSimilar } from "../Components/previewSimilar";
import { Tags } from "../Components/tags";
import { useSelected } from "../Providers/SelectedProvider";

export const GameHighlight = () => {
  const { selectedGame, userGameArrs } = useSelected();
  const { devFilter, genreFilter } = userGameArrs;

  return (
    <div className="container">
      {selectedGame === null || selectedGame === undefined ? (
        <EmptyResult />
      ) : (
        <div
          className="nes-container is-rounded with-title is-centered blue-bg"
          id="highlight"
        >
          <h1 className="title">Why not play...</h1>
          <div id="highlight-description">
            <div id="game-text">
              <h3 className="nes-text is-success">{selectedGame?.name}</h3>
              <h5 className="nes-text is-warning">
                By: {selectedGame.developer.name}
              </h5>
              <p>{selectedGame?.description}</p>
              {selectedGame !== null && selectedGame !== undefined && (
                <Tags
                  game={selectedGame}
                  label="genre"
                  key={`${selectedGame}-genres`}
                />
              )}
            </div>
            <div id="game-image-container">
              <img
                src={selectedGame?.image}
                alt={`${selectedGame?.name} box art`}
              />
            </div>
          </div>
          {selectedGame !== null && selectedGame !== undefined && (
            <Tags
              game={selectedGame}
              label="platform"
              key={`${selectedGame}-platforms`}
            />
          )}
        </div>
      )}
      {devFilter !== undefined && devFilter.length > 0 && (
        <PreviewSimilar
          title="More games from this developer"
          gameArr={Transform.shuffle(devFilter)}
        />
      )}
      {genreFilter !== undefined && genreFilter.length > 0 && (
        <PreviewSimilar
          title="Games with similar genres"
          gameArr={Transform.shuffle(genreFilter)}
        />
      )}
    </div>
  );
};
