import { gql } from 'graphql-request'
import { client } from './common'
import { AniListItem, CancellableRequest } from './types'
import { useQuery, useQueryClient } from 'react-query'

const QUERY_KEY = 'anilist-search-paginated'

interface Params {
  page?: number,
  perPage?: number,
  query: string
}

interface PageEntry {
  pageInfo: {
    total: number,
    currentPage: number,
    perPage: number
  },
  media: [AniListItem]
}

interface PageResult {
  Page: PageEntry
}

const call = (params: Params): CancellableRequest<PageEntry> => {
  const { page = 1, perPage = 30, query } = params

  const queryClient = useQueryClient()

  const useQueryResult = useQuery(QUERY_KEY, async ({ signal }) => {
    const { Page } = await client.request<PageResult>({
      document: gql`
        query ($page: Int, $perPage: Int, $search: String) {
          Page (page: $page, perPage: $perPage) {
            pageInfo {
              total,
              currentPage,
              perPage
            }
            media (search: $search, isAdult: false) {
              id
              description
              coverImage {
                large
                medium
                color
              }
              title {
                english,
                romaji,
                native
              },
              episodes,
              startDate {
                year
              },
              status,
              endDate {
                year
              },
              characters {
                nodes {
                  id,
                  name {
                    full
                  },
                  image {
                    medium
                  }
                }
              }
            }
          }
        },
      `,
      variables: { page, perPage, search: (query || '').trim() || null },
      signal
    })

    return Page
  }, { refetchOnWindowFocus: false })
  
  return {
    request: useQueryResult,
    canceller: () => {
      queryClient.cancelQueries(QUERY_KEY)
    }
  }
}

export default call
