import { useState } from "react";
import { useSelected } from "../../Providers/SelectedProvider";
import {
  developersList,
  genresList,
  platformsList,
} from "../../Assets/data-lists";
import { GenreSelect } from "./genreSelect";
import { CheckboxInput } from "./SFCheckbox";
import { useUser } from "../../Providers/UsersProvider";
import { useGames } from "../../Providers/GamesProvider";
import { makeSuggestion } from "./suggestionFormLogic";
import { useNavigate } from "react-router";

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
  const navigate = useNavigate();

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

  return (
    <div>
      <form
        className="nes-container is-rounded with-title"
        id="suggestion-form"
        action=""
        onSubmit={(e) => {
          e.preventDefault();
          setSelectedGame(
            makeSuggestion({
              states: {
                selectGenres,
                selectedDev,
                selectPlatform,
                allowHidden,
                favOnly,
                newOnly,
                ownedOnly,
                playedOnly,
              },
              allGamesRaw,
              userGameArrs,
            })
          );
          navigate("/game-highlight");
        }}
      >
        <h2 className="title">What do you feel like playing today?</h2>
        <div className="nes-container with-title is-rounded" id="genre-select">
          <h4>Genre Selection:</h4>
          <div id="select-container">
            {!showAllGenres &&
              genresList.slice(0, 11).map((genre, i) => {
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
          </div>
          <div
            onClick={() => {
              showAllGenres ? setShowAllGenres(false) : setShowAllGenres(true);
            }}
            className="nes-btn is-warning"
          >
            <p>{showAllGenres ? "Show Less" : "Show More"}</p>
          </div>
        </div>
        <div className="nes-container is-rounded" id="developer-select">
          <h4>Developer Selection:</h4>
          <select
            name="developer"
            className="nes-select nes-pointer"
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
        <div className="nes-container is-rounded" id="platform-select">
          <h4>Platform Section:</h4>
          <div className="platform-container">
            {platformsList.map((platform) => {
              return (
                <div className="platform-option" key={platform}>
                  <label htmlFor={platform}>
                    <input
                      type="radio"
                      id={platform}
                      className="nes-radio"
                      name="Platform"
                      value={platform}
                      checked={selectPlatform === platform}
                      onChange={() => {
                        setSelectPlatform(platform);
                      }}
                    ></input>
                    <span>{platform}</span>
                  </label>
                </div>
              );
            })}
          </div>
        </div>
        {user && optionalFilterCheck && (
          <div className="nes-container is-rounded" id="optional">
            <h4>Optional Filters:</h4>
            <div className="optional-container">
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
          </div>
        )}
        <div className="suggestion-btns">
          <button type="submit" className="nes-btn is-success" id="submit">
            Submit
          </button>
          <button
            type="reset"
            className="nes-btn is-error"
            onClick={() => reset()}
            id="reset"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
};
