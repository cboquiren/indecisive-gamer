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

type TFavorite = {
  userId: number,
  gameId: number,
  type: 'favorite',
  isFavorite: boolean,
  id: number
}

type TPlayed = {
  userId: number,
  gameId: number,
  type: 'played',
  hasPlayed: boolean,
  id: number
}

type TOwned = {
  userId: number,
  gameId: number,
  type: 'owned',
  isOwned: boolean,
  id: number
}

type THidden = {
  userId: number,
  gameId: number,
  type: 'hidden',
  isHidden: boolean,
  id: number
}

export type TInteraction = TFavorite | TPlayed | TOwned | THidden;