import toast from "react-hot-toast"
import { TUser } from "../Assets/types";


const base_users_URL = "http://localhost:3000/users"

const findUser = (user: Omit<TUser, 'id'>) => {
  return fetch(base_users_URL).then((response) => {
    if (!response.ok) {
      toast.error("Sorry, our servers seem to be afk");
      throw new Error("Could not reach the server.");
    }
    return response.json();
  }).then((response: TUser[]) => {
    const findUsername = response.filter((knownUser) => knownUser.username === user.username);
    if (findUsername.length === 0) {
      toast.error("User Not Found!");
      throw new Error("User Not Found!");
    }
    return findUsername;
  }).then((response) => {
    const checkPassword = response.find((foundUser) => foundUser.password === user.password);
    if (!checkPassword) {
      toast.error("Username and Password Do Not Match!");
      throw new Error("Username and Password Do Not Match!");
    }
    return checkPassword;
  })
};

const createUser = (user: Omit<TUser,'id'>) => {
  return fetch(base_users_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
  }).then((response) => {
    if (!response.ok) {
      toast.error("Our server went to touch some grass");
      throw new Error("Could not reach the server.")
    }
    return response.json();
  })
}

const checkUsername = (username: string) => {
  return fetch(base_users_URL).then((response) => {
    if (!response.ok) {
      toast.error("Our server went to touch some grass");
      throw new Error("Could not reach the server.");
    }
    return response.json();
  }).then((response: TUser[]) => {
    const findUsername = response.filter((knownUser) => knownUser.username === username);
    if (findUsername.length > 0) {
      toast.error("That username is already taken!");
      throw new Error("Username is already in use!");
    }
    return findUsername;
  })
}


export const userRequests = {
  findUser,
  createUser,
  checkUsername
}