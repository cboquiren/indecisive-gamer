import { z } from "zod";

const base_games_URL = "http://localhost:3000/games";

const gameSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string(),
  image: z.string(),
  postedBy: z.number(),
  developerId: z.number(),
  developer: z.object({
    id: z.number(),
    name: z.string(),
  }),
  genres: z.array(z.object({ id: z.number(), name: z.string() })),
  platforms: z.array(z.object({ id: z.number(), name: z.string() })),
});

const requestGames = (token: string | null) => {
  const headers: Record<string, string> = {};
  if (token) {
    headers["Authorization"] = token;
  }

  return fetch(base_games_URL, {
    headers,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Could not reach the server.");
      }
      return response.json();
    })
    .then((data) => {
      return z.array(gameSchema).parse(data.games);
    });
};

export const gamesRequests = {
  requestGames,
};
