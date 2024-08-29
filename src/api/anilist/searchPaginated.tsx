import request, { gql } from 'graphql-request'
import { client } from './common'
import { AniListItem } from './types'
import { useQuery } from 'react-query'

interface Params {
  page?: number,
  perPage?: number,
  query: string
}

interface PageResult {
  Page: {
    pageInfo: {
      total: number,
      currentPage: number,
      perPage: number
    },
    media: [AniListItem]
  }
}

const call = (params: Params) => {
  const { page = 0, perPage = 30, query } = params

  return useQuery('anilist-search-paginated', async () => {
    const { Page } = await client.request<PageResult>(
      gql`
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
                romaji
              }
            }
          }
        }
      `,
      { page, perPage, search: query }
    )

    return Page
  }, { refetchOnWindowFocus: false })
}

export default call
