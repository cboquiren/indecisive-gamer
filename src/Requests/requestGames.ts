import toast from "react-hot-toast";
import { TGame } from "../Assets/types";

const base_games_URL = "http://localhost:3000/games";

const requestGames = () => {
  return fetch(base_games_URL)
    .then((response) => {
      if (!response.ok) {
        toast.error("All our games are in the wrong case, please try again in a few moments.");
        throw new Error("Could not reach the server.");
      }
      return response.json();
    })
    .then((data: { games: TGame[] }) => {
      return data.games;
    });
};

export const gamesRequests = {
  requestGames,
};
