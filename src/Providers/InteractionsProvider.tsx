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
import toast from "react-hot-toast";

type TInteractionContext = {
  userInteractions: TInteraction[];
  setUserInteractions: Dispatch<SetStateAction<TInteraction[]>>;
  userDataArrs: TUserDataArr;
  newInteraction: (data: Omit<TInteraction, "id">) => Promise<TInteraction>;
  removeInteraction: (data: Omit<TInteraction, "id">) => Promise<TInteraction>;
  userLogout: () => void;
};

type TUserDataArr = {
  favs: TInteraction[];
  played: TInteraction[];
  owned: TInteraction[];
  hidden: TInteraction[];
};

const InteractionContext = createContext<TInteractionContext | undefined>(undefined);

export const InteractionsProvider = ({ children }: { children: ReactNode }) => {
  const [userInteractions, setUserInteractions] = useState<TInteraction[]>([]);
  const { user, setUser } = useUser();

  const fetchUserInteractions = () => {
    return interactionsRequests.requestInteractions().then((response: TInteraction[]) => {
      if (user) {
        const filterUser = response.filter((interaction) => interaction.userId === user.id);
        setUserInteractions(filterUser);
      }
    });
  };

  useEffect(() => {
    fetchUserInteractions();
  }, [user]);

  const filterInteractions = (type: string) => {
    return userInteractions.filter((interaction) => {
      return interaction.type === type;
    });
  };

  const userDataArrs = {
    favs: filterInteractions("favorite"),
    played: filterInteractions("played"),
    owned: filterInteractions("owned"),
    hidden: filterInteractions("hidden"),
  };

  const newInteraction = (data: Omit<TInteraction, "id">) => {
    if (!user) {
      toast.error("Please Log In!");
      throw new Error("No user found.");
    }
    return interactionsRequests.createInteraction(data).then((interaction: TInteraction) => {
      toast.success(`Successfully added to your ${interaction.type} games library!`);
      fetchUserInteractions();
      return interaction;
    });
  };

  const removeInteraction = (data: Omit<TInteraction, "id">) => {
    if (!user) {
      toast.error("Please Log In!");
      throw new Error("No user found.");
    }
    const findId = userInteractions.find((interaction) => {
      return interaction.gameId === data.gameId && interaction.type === data.type;
    });
    if (!findId) {
      toast.error("Please reload the page");
      throw new Error("No interaction found.");
    }
    return interactionsRequests.deleteInteraction(findId.id).then((interaction: TInteraction) => {
      toast.success(`Successfully removed from your ${interaction.type} games library!`);
      fetchUserInteractions();
      return interaction;
    });
  };

  const userLogout = () => {
    setUser(null);
    setUserInteractions([]);
    toast.success("Successfully Logged Out!");
  };

  return (
    <InteractionContext.Provider
      value={{
        userInteractions,
        setUserInteractions,
        userDataArrs,
        newInteraction,
        removeInteraction,
        userLogout,
      }}
    >
      {children}
    </InteractionContext.Provider>
  );
};

export const useInteractions = () => {
  const context = useContext(InteractionContext);
  if (!context) {
    throw new Error("Please use 'useInteractions' hook within InteractionContext scope.");
  }
  return context;
};
