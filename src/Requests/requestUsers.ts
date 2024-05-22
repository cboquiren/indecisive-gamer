import toast from "react-hot-toast";
import { TUser } from "../Assets/types";

const AUTH_URL = "http://localhost:3000/auth";

const findUser = (user: Omit<TUser, "id">) => {
  return fetch(AUTH_URL + "/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 404) {
        toast.error("User Not Found");
        throw new Error("User Not Found");
      }
      if (response.status === 401) {
        toast.error("Username and Password Do Not Match!");
        throw new Error("Username and Password Do Not Match!");
      }
      return response.json();
    })
    .then((data: { token: string }) => {
      return data.token;
    });
};

const createUser = (user: Omit<TUser, "id">) => {
  return fetch(AUTH_URL + "/create-account", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      if (response.status === 403) {
        toast.error("That Username Is Taken!");
        throw new Error("Username Taken");
      }
      return response.json();
    })
    .then((data: { token: string }) => {
      return data.token;
    });
};

export const userRequests = {
  findUser,
  createUser,
};
