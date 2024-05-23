import { Transform } from "../../Assets/transformations";
import {
  TGame,
  TSuggestionFormStates,
  TUserGameArrs,
} from "../../Assets/types";

export const optionalFilter = (
  arr: TGame[],
  userGameArrs: TUserGameArrs,
  filter: "playedG" | "ownedG" | "favG"
) => {
  return arr.filter((game) => {
    return userGameArrs[filter].map((game) => game.id).includes(game.id);
  });
};

export const makeSuggestion = ({
  states,
  userGameArrs,
  allGamesRaw,
}: {
  states: TSuggestionFormStates;
  userGameArrs: TUserGameArrs;
  allGamesRaw: TGame[];
}) => {
  const {
    allowHidden,
    newOnly,
    playedOnly,
    ownedOnly,
    favOnly,
    selectedDev,
    selectPlatform,
    selectGenres,
  } = states;
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
    games = Transform.shuffle(optionalFilter(games, userGameArrs, "playedG"));
  }
  if (ownedOnly) {
    games = Transform.shuffle(optionalFilter(games, userGameArrs, "ownedG"));
  }
  if (favOnly) {
    games = Transform.shuffle(optionalFilter(games, userGameArrs, "favG"));
  }

  if (selectedDev !== "Any Developer") {
    games = Transform.shuffle(
      games.filter((game) => game.developer.name === selectedDev)
    );
  }
  if (selectPlatform !== "Any Platform") {
    const platformGames = games.filter((game) => {
      const gamePlatforms = game.platforms.map((platform) => platform.name);
      return gamePlatforms.includes(selectPlatform);
    });

    games = Transform.shuffle(platformGames);
  }
  if (selectGenres.length > 0) {
    const genreGames = games.filter((game) => {
      const gameGenres = game.genres.map((genre) => genre.name);
      const filterGamesByGenres = gameGenres.filter((genre) => {
        return selectGenres.includes(genre);
      });
      return filterGamesByGenres.length > 0;
    });
    games = Transform.shuffle(genreGames);
  }
  return games[Math.floor(Math.random() * games.length)];
};
