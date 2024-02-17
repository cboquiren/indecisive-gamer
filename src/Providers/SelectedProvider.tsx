import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { TGame, TUserGameArrs } from "../Assets/types";
import { useGames } from "./GamesProvider";
import { useInteractions } from "./InteractionsProvider";
import { genresList } from "../Assets/data-lists";

type TSelectedContext = {
  selectedGame: TGame | null;
  setSelectedGame: Dispatch<SetStateAction<TGame | null>>;
  selectRandom: () => void;
  userGameArrs: TUserGameArrs;
};

const SelectedContext = createContext<TSelectedContext | undefined>(undefined);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGame, setSelectedGame] = useState<TGame | null>(null);
  const { allGamesRaw } = useGames();
  const { userDataArrs } = useInteractions();

  const numberGenerator = (maxVal: number) => {
    return Math.floor(Math.random() * maxVal);
  };

  const userAvailableGames = allGamesRaw.filter((game) => {
    const hiddenGames = userDataArrs.hidden.map((game) => game.gameId);
    return !hiddenGames.includes(Number(game.id));
  });

  const selectRandom = () => {
    setSelectedGame(userAvailableGames[numberGenerator(userAvailableGames.length)]);
  };

  const filterGames = (type: "favs" | "played" | "owned" | "hidden") => {
    return allGamesRaw.filter((game) => {
      const filter = userDataArrs[type].map((game) => game.gameId);
      return filter.includes(Number(game.id));
    });
  };

  const filterDev = () => {
    if (selectedGame) {
      const allDevG = userAvailableGames.filter(
        (game) => game.developer === selectedGame.developer
      );
      return allDevG.filter((game) => {
        return game.id !== selectedGame.id;
      });
    }
  };

  const filterGenre = () => {
    if (selectedGame) {
      const gameGenres = Object.values(selectedGame).filter((value) => {
        if (typeof value === "string") {
          return genresList.includes(value);
        }
      });
      const similarGenres = userAvailableGames.filter((game) => {
        const sameGen = Object.values(game).filter((value) => {
          if (typeof value === "string") {
            return gameGenres.includes(value);
          }
        });
        return sameGen.length > 0;
      });

      return similarGenres;
    }
  };

  const userGameArrs = {
    favG: filterGames("favs"),
    playedG: filterGames("played"),
    ownedG: filterGames("owned"),
    hiddenG: filterGames("hidden"),
    userAvailG: userAvailableGames,
    devFilter: filterDev(),
    genreFilter: filterGenre(),
  };

  console.log(selectedGame);

  return (
    <SelectedContext.Provider value={{ selectedGame, setSelectedGame, selectRandom, userGameArrs }}>
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error("Please use 'useSelected' hook within SelectedContext scope.");
  }
  return context;
};
