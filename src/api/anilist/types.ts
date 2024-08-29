import { UseQueryResult } from "react-query"

export interface AniListItem {
  id: number,
  description: string,
  coverImage: {
    large: string,
    medium: string,
    color?: string
  },
  title: {
    english?: string,
    romaji: string
  }
}

export interface FavedItemsMap {
  [key: string]: AniListItem
}

export interface CancellableRequest<T> {
  request: UseQueryResult<T>,
  canceller: () => void
}
