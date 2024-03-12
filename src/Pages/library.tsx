import { useState } from "react";
import { GameCard } from "../Components/GameCard";
import { useSelected } from "../Providers/SelectedProvider";
import { useUser } from "../Providers/UsersProvider";

type TLibrary = "all" | "played" | "hidden" | "favs" | "owned";

export const Library = () => {
  const [library, setLibrary] = useState<TLibrary>("all");
  const { user } = useUser();
  const { userGameArrs } = useSelected();
  const { userAvailG, hiddenG, favG, ownedG, playedG } = userGameArrs;
  const game = userAvailG[0];
  const libraryFilter =
    library === "played"
      ? playedG
      : library === "hidden"
      ? hiddenG
      : library === "favs"
      ? favG
      : library === "owned"
      ? ownedG
      : userAvailG;

  return (
    <div className="container page-container">
      <div className="nes-container is-rounded with-title is-centered" id="library">
        <h1 className="title">Game Library</h1>
        {user && (
          <nav className="nes-container is-rounded" id="library-nav">
            <ul>
              <li>
                <button className="nes-btn" onClick={() => setLibrary("all")}>
                  All Games
                </button>
              </li>
              <li>
                <button className="nes-btn is-primary" onClick={() => setLibrary("favs")}>
                  Liked Games
                </button>
              </li>
              <li>
                <button className="nes-btn is-success" onClick={() => setLibrary("played")}>
                  Played Games
                </button>
              </li>
              <li>
                <button className="nes-btn is-warning" onClick={() => setLibrary("owned")}>
                  Owned Games
                </button>
              </li>
              <li>
                <button className="nes-btn is-error" onClick={() => setLibrary("hidden")}>
                  Hidden Games
                </button>
              </li>
            </ul>
          </nav>
        )}
        <div id="card-container">
          {game !== undefined &&
            libraryFilter.map((game) => {
              return <GameCard game={game} key={game.id} />;
            })}
        </div>
      </div>
    </div>
  );
};
