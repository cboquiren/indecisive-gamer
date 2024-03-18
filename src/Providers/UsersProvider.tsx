import { Dispatch, ReactNode, SetStateAction, createContext, useContext, useState } from "react";
import { TUser } from "../Assets/types";
import { userRequests } from "../Requests/requestUsers";
import toast from "react-hot-toast";
import { useNavigate } from "react-router";

type TUserContext = {
  user: TUser | null;
  setUser: Dispatch<SetStateAction<TUser | null>>;
  userLogin: (user: Omit<TUser, "id">) => Promise<TUser>;
  verifyNewUser: (user: Omit<TUser, "id">) => Promise<TUser>;
};

const UserContext = createContext<TUserContext | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<TUser | null>(null);
  const navigate = useNavigate();

  const userLogin = (user: Omit<TUser, "id">) => {
    return userRequests.findUser(user).then((verifiedUser) => {
      setUser(verifiedUser);
      toast.success(`Welcome Back ${verifiedUser.username}!`);
      navigate("/library");
      return verifiedUser;
    });
  };

  const createUser = (user: Omit<TUser, "id">) => {
    return userRequests.createUser(user).then((newUser: TUser) => {
      setUser(newUser);
      toast.success(`Welcome ${newUser.username}!`);
      navigate("/library");
      return newUser;
    });
  };

  const verifyNewUser = (user: Omit<TUser, "id">) => {
    return userRequests.checkUsername(user.username).then(() => {
      return createUser(user);
    });
  };

  return (
    <UserContext.Provider value={{ user, setUser, userLogin, verifyNewUser }}>
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
