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
import { useUser } from "./UsersProvider";

type TGamesContext = {
  allGamesRaw: TGame[];
  setAllGamesRaw: Dispatch<SetStateAction<TGame[]>>;
};

const GamesContext = createContext<TGamesContext | undefined>(undefined);

export const GamesProvider = ({ children }: { children: ReactNode }) => {
  const [allGamesRaw, setAllGamesRaw] = useState<TGame[]>([]);
  const { user } = useUser();

  const requestAllGamesRaw = () => {
    return gamesRequests.requestGames(user).then(setAllGamesRaw);
  };

  useEffect(() => {
    requestAllGamesRaw();
  }, [user]);

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
