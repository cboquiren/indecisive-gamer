import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { TInteraction } from "../Assets/types";
import { useUser } from "./UsersProvider";
import { interactionsRequests } from "../Requests/requestInteractions";

type TInteractionContext = {
  allInteractions: TInteraction[];
  setAllInteractions: Dispatch<SetStateAction<TInteraction[]>>;
};

const InteractionContext = createContext<TInteractionContext | undefined>(undefined);

export const InteractionsProvider = ({ children }: { children: ReactNode }) => {
  const [allInteractions, setAllInteractions] = useState<TInteraction[]>([]);

  const { user } = useUser();

  const fetchAllInteractions = () => {
    return interactionsRequests.requestInteractions().then(setAllInteractions);
  };

  useEffect(() => {
    fetchAllInteractions();
  }, []);

  return (
    <InteractionContext.Provider value={{ allInteractions, setAllInteractions }}>
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteractions = () => {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("Please use 'useInteractions' hook within InteractionContext scope.");
  }
};
