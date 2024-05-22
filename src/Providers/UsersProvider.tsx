import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { TUser } from "../Assets/types";
import { userRequests } from "../Requests/requestUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type TUserContext = {
  user: string | null;
  setUser: Dispatch<SetStateAction<string | null>>;
  userLogin: (user: Omit<TUser, "id">) => Promise<string>;
  createUser: (user: Omit<TUser, "id">) => Promise<string>;
};

const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  const userLogin = (user: Omit<TUser, "id">) => {
    return userRequests.findUser(user).then((verifiedUser) => {
      setUser(verifiedUser);
      toast.success(`Welcome Back!`);
      navigate("/library");
      return verifiedUser;
    });
  };

  const createUser = (user: Omit<TUser, "id">) => {
    return userRequests.createUser(user).then((newUser) => {
      setUser(newUser);
      toast.success(`Welcome!`);
      navigate("/library");
      return newUser;
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, userLogin, createUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("Please use 'useUser' hook within UserContext scope.");
  }
  return context;
};
