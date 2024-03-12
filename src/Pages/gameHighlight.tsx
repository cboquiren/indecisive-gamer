import { genresList, platformsList } from "../Assets/data-lists";
import { PreviewSimilar } from "../Components/previewSimilar";
import { Tags } from "../Components/tags";
import { useSelected } from "../Providers/SelectedProvider";

export const GameHighlight = () => {
  const { selectedGame, userGameArrs } = useSelected();
  const { devFilter, genreFilter } = userGameArrs;

  console.log("devs", devFilter);
  console.log("genres", genreFilter);
  return (
    <div className="container page-container">
      <div className="nes-container is-rounded with-title is-centered" id="highlight">
        <h1 className="title">Why not play...</h1>
        <div id="highlight-description">
          <div id="game-text">
            <h3 className="nes-text is-success">{selectedGame?.name}</h3>
            <h5 className="nes-text is-warning">By: {selectedGame?.developer}</h5>
            <p>{selectedGame?.description}</p>
            {selectedGame !== null && selectedGame !== undefined && (
              <Tags
                dataArr={genresList}
                game={selectedGame}
                label="genre"
                key={`${selectedGame}-genres`}
              />
            )}
          </div>
          <div id="game-image-container">
            <img src={selectedGame?.image} alt={`${selectedGame?.name} box art`} />
          </div>
        </div>
        {selectedGame !== null && selectedGame !== undefined && (
          <Tags
            dataArr={platformsList}
            game={selectedGame}
            label="platform"
            key={`${selectedGame}-platforms`}
          />
        )}
      </div>
      {devFilter !== undefined && devFilter?.length > 0 && (
        <PreviewSimilar title="More games from this developer" gameArr={devFilter} />
      )}
    </div>
  );
};
