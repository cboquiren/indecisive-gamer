export type TGame = {
  name: string,
  description: string,
  "genre-0": string,
  "genre-1"?: string,
  "genre-2"?: string,
  "genre-3"?: string,
  "genre-4"?: string,
  'allGenres'?: string[],
  image: string,
  developer: string,
  "platform-0": string,
  "platform-1"?: string,
  "platform-2"?: string,
  "platform-3"?: string,
  "platform-4"?: string,
  id: number
}

export type TUser = {
  username: string,
  password: string,
  id: number
}