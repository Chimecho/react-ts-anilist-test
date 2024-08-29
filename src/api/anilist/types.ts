import { UseQueryResult } from "react-query"

interface CharacterNode {
  id: number,
  name: {
    full: string
  },
  image: {
    medium?: string
  }
}

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
  },
  episodes: number,
  startDate: {
    year: number
  },
  status: 'FINISHED' | 'RELEASING' | 'NOT_YET_RELEASED' | 'CANCELED' | 'HIATUS',
  endDate: {
    year: number
  },
  characters: {
    nodes: [CharacterNode]
  }
}

export interface FavedItemsMap {
  [key: number]: AniListItem
}

export interface CancellableRequest<T> {
  request: UseQueryResult<T>,
  canceller: () => void
}
