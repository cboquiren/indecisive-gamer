import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TGame, TUserGameArrs } from "../Assets/types";
import { useGames } from "./GamesProvider";
import { useInteractions } from "./InteractionsProvider";

type TSelectedContext = {
  selectedGame: TGame | null | undefined;
  setSelectedGame: Dispatch<SetStateAction<TGame | null | undefined>>;
  selectRandom: () => void;
  userGameArrs: TUserGameArrs;
};

const SelectedContext = createContext<TSelectedContext | undefined>(undefined);

export const SelectedProvider = ({ children }: { children: ReactNode }) => {
  const [selectedGame, setSelectedGame] = useState<TGame | null | undefined>(
    null
  );
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
    setSelectedGame(
      userAvailableGames[numberGenerator(userAvailableGames.length)]
    );
  };

  useEffect(() => {
    selectRandom();
  }, [allGamesRaw]);

  const filterGames = (type: "favs" | "played" | "owned" | "hidden") => {
    return allGamesRaw.filter((game) => {
      const filter = userDataArrs[type].map((game) => game.gameId);
      return filter.includes(Number(game.id));
    });
  };

  const filterDev = () => {
    if (selectedGame) {
      const allDevG = userAvailableGames.filter(
        (game) => game.developerId === selectedGame.developerId
      );
      return allDevG.filter((game) => {
        return game.id !== selectedGame.id;
      });
    }
  };

  const filterGenre = () => {
    if (selectedGame) {
      const selectedGameGenres =
        selectedGame.genres?.map((genre) => genre.name) || [];
      if (selectedGameGenres.length === 0) {
        console.log("InvalidSelectedGameGenres");
        console.log({ selectedGameGenres });
      }
      const similarGames = userAvailableGames.filter((game) => {
        if (!game.genres) {
          console.log("Invalid Game Genres");
          console.log(game);
        }
        const gameGenres = game.genres?.map((genre) => genre.name) ?? [];
        const findSameGenres = gameGenres.filter((genre) => {
          if (selectedGameGenres.includes(genre)) {
            return true;
          }
        });
        return findSameGenres.length > 0;
      });
      return similarGames;
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

  return (
    <SelectedContext.Provider
      value={{ selectedGame, setSelectedGame, selectRandom, userGameArrs }}
    >
      {children}
    </SelectedContext.Provider>
  );
};

export const useSelected = () => {
  const context = useContext(SelectedContext);
  if (!context) {
    throw new Error(
      "Please use 'useSelected' hook within SelectedContext scope."
    );
  }
  return context;
};
