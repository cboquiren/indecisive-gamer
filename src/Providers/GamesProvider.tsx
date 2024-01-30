import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TGame } from "../Assets/types";
import { gamesRequests } from "../Requests/requestGames";

type TGamesContext = {
  allGamesRaw: TGame[];
  setAllGamesRaw: Dispatch<SetStateAction<TGame[]>>;
};

const GamesContext = createContext<TGamesContext | undefined>(undefined);

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [allGamesRaw, setAllGamesRaw] = useState<TGame[]>([]);

  const requestAllGamesRaw = () => {
    return gamesRequests.requestGames().then(setAllGamesRaw);
  };

  useEffect(() => {
    requestAllGamesRaw();
  }, []);

  return (
    <GamesContext.Provider value={{ allGamesRaw, setAllGamesRaw }}>
      {children}
    </GamesContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) {
    throw new Error("Please use 'useGames' hook within GamesContext scope.");
  }
  return context;
};
