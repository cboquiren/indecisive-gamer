import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { TUser } from "../Assets/types";
import { userRequests } from "../Requests/requestUsers";
import toast from "react-hot-toast";

type TUserContext = {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  userLogin: (user: Omit<TUser, "id">) => Promise<TUser>;
  verifyNewUser: (user: Omit<TUser, "id">) => Promise<TUser>;
  userLogout: () => void;
};

const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);

  const userLogin = (user: Omit<TUser, "id">) => {
    return userRequests.findUser(user).then((verifiedUser) => {
      setUser(verifiedUser);
      toast.success(`Welcome Back ${verifiedUser.username}!`);
      return verifiedUser;
    });
  };

  const createUser = (user: Omit<TUser, "id">) => {
    return userRequests.createUser(user).then((newUser: TUser) => {
      setUser(newUser);
      toast.success(`Welcome ${newUser.username}!`);
      return newUser;
    });
  };

  const verifyNewUser = (user: Omit<TUser, "id">) => {
    return userRequests.checkUsername(user.username).then(() => {
      return createUser(user);
    });
  };

  const userLogout = () => {
    setUser(null);
    toast.success("Successfully logged out!");
  };

  return (
    <UserContext.Provider value={{ user, setUser, userLogin, verifyNewUser, userLogout }}>
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
