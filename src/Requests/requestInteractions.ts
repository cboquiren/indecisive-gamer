import { TInteraction } from "../Assets/types";

const base_interactions_URL = "http://localhost:3000/interactions";

const requestInteractions = (user: string) => {
  return fetch(base_interactions_URL, {
    headers: {
      "Authorization": user,
    },
  })
    .then((response) => {
      if (response.status === 406) {
        return [];
      }
      if (response.status === 401) {
        return [];
      }
      return response.json();
    })
    .then((data: { userInteractions: TInteraction[] }) => {
      return data.userInteractions;
    });
};

const createInteraction = (
  user: string,
  data: Omit<TInteraction, "id" | "userId">
) => {
  return fetch(base_interactions_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": user,
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not reach the server.");
      }
      return response.json();
    })
    .then((data: { message: string; interaction: TInteraction }) => {
      return data.interaction;
    });
};

const deleteInteraction = (user: string, data: string) => {
  return fetch(`${base_interactions_URL}/${data}`, {
    method: "DELETE",
    headers: {
      "Authorization": user,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not reach the server.");
      }
      return response.json();
    })
    .then((data: { message: string; interaction: TInteraction }) => {
      return data.interaction;
    });
};

export const interactionsRequests = {
  requestInteractions,
  createInteraction,
  deleteInteraction,
};
