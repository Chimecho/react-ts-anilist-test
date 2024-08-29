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
    romaji?: string
    native: string
  }
}

export interface FavedItemsMap {
  [key: number]: AniListItem
}

export interface CancellableRequest<T> {
  request: UseQueryResult<T>,
  canceller: () => void
}
