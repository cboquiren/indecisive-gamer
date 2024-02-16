import { useState } from "react";
import { useSelected } from "../Providers/SelectedProvider";
import { developersList, genresList, platformsList } from "../Assets/data-lists";
import { GenreSelect } from "./Suggestion Form/genreButtons";
import { CheckboxInput } from "./SFCheckbox";
import { useUser } from "../Providers/UsersProvider";
import { Transform } from "../Assets/transformations";
import { useGames } from "../Providers/GamesProvider";
import { TGame } from "../Assets/types";

export const SuggestionForm = () => {
  const [selectGenres, setSelectGenres] = useState<string[]>([]);
  const [selectedDev, setSelectedDev] = useState<string>("Any Developer");
  const [selectPlatform, setSelectPlatform] = useState<string>("Any Platform");
  const [allowHidden, setAllowHidden] = useState<boolean>(false);
  const [newOnly, setNewOnly] = useState<boolean>(false);
  const [playedOnly, setPlayedOnly] = useState<boolean>(false);
  const [ownedOnly, setOwnedOnly] = useState<boolean>(false);
  const [favOnly, setFavOnly] = useState<boolean>(false);
  const [showAllGenres, setShowAllGenres] = useState<boolean>(false);

  const { user } = useUser();
  const { allGamesRaw } = useGames();
  const { userGameArrs, setSelectedGame } = useSelected();

  const optionalFilterCheck =
    userGameArrs.favG.length > 0 &&
    userGameArrs.hiddenG.length > 0 &&
    userGameArrs.ownedG.length > 0 &&
    userGameArrs.playedG.length > 0;

  const reset = () => {
    setSelectGenres([]);
    setSelectedDev("Any Developer");
    setSelectPlatform("Any Platform");
    setAllowHidden(false);
    setNewOnly(false);
    setPlayedOnly(false);
    setOwnedOnly(false);
    setShowAllGenres(false);
    setFavOnly(false);
  };

  const optionalFilter = (arr: TGame[], filter: "playedG" | "ownedG" | "favG") => {
    return arr.filter((game) => {
      return userGameArrs[filter].map((game) => game.id).includes(game.id);
    });
  };

  const makeSuggestion = () => {
    let games = Transform.shuffle(userGameArrs.userAvailG);
    if (allowHidden) {
      games = Transform.shuffle(allGamesRaw);
    }
    if (newOnly) {
      const newGames = games.filter((game) => {
        return !userGameArrs.playedG.map((game) => game.id).includes(game.id);
      });
      games = Transform.shuffle(newGames);
    }
    if (playedOnly) {
      games = Transform.shuffle(optionalFilter(games, "playedG"));
    }
    if (ownedOnly) {
      games = Transform.shuffle(optionalFilter(games, "ownedG"));
    }
    if (favOnly) {
      games = Transform.shuffle(optionalFilter(games, "favG"));
    }

    if (selectedDev !== "Any Developer") {
      games = Transform.shuffle(games.filter((game) => game.developer === selectedDev));
    }
    if (selectPlatform !== "Any Platform") {
      const platformGames = games.filter((game) => {
        const gamePlatforms = Object.values(game).filter((value) => {
          if (typeof value === "string") {
            return platformsList.includes(value);
          }
        });
        return gamePlatforms.includes(selectPlatform);
      });
      games = Transform.shuffle(platformGames);
    }

    console.log(games);
  };

  console.log(makeSuggestion());

  return (
    <div>
      <form action="">
        <h2>What do you feel like playing today?</h2>
        <div>
          <h4>Genre Selection</h4>
          {!showAllGenres &&
            genresList.slice(0, 7).map((genre, i) => {
              return (
                <GenreSelect
                  genre={genre}
                  key={i}
                  selectGenres={selectGenres}
                  setSelectGenres={(data) => setSelectGenres(data)}
                />
              );
            })}
          {showAllGenres &&
            genresList.map((genre, i) => {
              return (
                <GenreSelect
                  genre={genre}
                  key={i}
                  selectGenres={selectGenres}
                  setSelectGenres={(data) => setSelectGenres(data)}
                />
              );
            })}
          <div
            onClick={() => {
              showAllGenres ? setShowAllGenres(false) : setShowAllGenres(true);
            }}
          >
            {showAllGenres ? <p>Show Less</p> : <p>Show More</p>}
          </div>
        </div>
        <div>
          <h4>Developer Selection</h4>
          <label htmlFor="developer">From this Developer: </label>
          <select
            name="developer"
            id="developer"
            key="developer"
            value={selectedDev}
            onChange={(e) => {
              setSelectedDev(e.target.value);
            }}
          >
            {developersList.map((developer) => {
              return (
                <option key={developer} value={developer}>
                  {developer}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <h4>Platform Section</h4>
          {platformsList.map((platform) => {
            return (
              <div key={platform}>
                <input
                  type="radio"
                  id={platform}
                  name="Platform"
                  value={platform}
                  checked={selectPlatform === platform}
                  onChange={() => {
                    setSelectPlatform(platform);
                  }}
                ></input>
                <label htmlFor={platform}>{platform}</label>
              </div>
            );
          })}
        </div>
        {user && optionalFilterCheck && (
          <div>
            <h4>Optional Filters</h4>
            {userGameArrs.hiddenG.length > 0 && (
              <CheckboxInput
                filter="hidden"
                label="Allow Hidden Games"
                state={allowHidden}
                stateChange={(data) => setAllowHidden(data)}
                key={"hidden"}
              />
            )}
            {userGameArrs.playedG.length > 0 && !playedOnly && (
              <CheckboxInput
                filter="new"
                label="Never Played Games Only"
                state={newOnly}
                stateChange={(data) => setNewOnly(data)}
                key={"new"}
              />
            )}
            {userGameArrs.ownedG.length > 0 && (
              <CheckboxInput
                filter="owned"
                label="Owned Games Only"
                state={ownedOnly}
                stateChange={(data) => setOwnedOnly(data)}
                key={"owned"}
              />
            )}
            {userGameArrs.playedG.length > 0 && !newOnly && (
              <CheckboxInput
                filter="played"
                label="Previously Played Games Only"
                state={playedOnly}
                stateChange={(data) => setPlayedOnly(data)}
                key={"played"}
              />
            )}
            {userGameArrs.favG.length > 0 && (
              <CheckboxInput
                filter="favs"
                label="Liked Games Only"
                state={favOnly}
                stateChange={(data) => setFavOnly(data)}
                key={"favs"}
              />
            )}
          </div>
        )}
        <button type="submit">Submit</button>
        <button type="reset" onClick={() => reset()}>
          Reset
        </button>
      </form>
    </div>
  );
};
