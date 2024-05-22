import toast from "react-hot-toast";
import { TInteraction } from "../Assets/types";

const base_interactions_URL = "http://localhost:3000/interactions";

const requestInteractions = () => {
  return fetch(base_interactions_URL).then((response) => {
    if (response.status === 406) {
      toast.error("Please Log In");
      return [];
    }
    if (response.status === 401) {
      toast.error("Invalid User Token");
      return [];
    }
    return response.json();
  });
};

const createInteraction = (data: Omit<TInteraction, "id">) => {
  return fetch(base_interactions_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => {
    if (!response.ok) {
      toast.error("Our server needed to grab some snacks");
      throw new Error("Could not reach the server.");
    }
    return response.json();
  });
};

const deleteInteraction = (data: string) => {
  return fetch(`${base_interactions_URL}/${data}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      toast.error("Our server needed to stretch its legs");
      throw new Error("Could not reach the server.");
    }
    return response.json();
  });
};

export const interactionsRequests = {
  requestInteractions,
  createInteraction,
  deleteInteraction,
};
