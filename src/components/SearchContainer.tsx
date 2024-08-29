import SearchBar from '@/components/generic/SearchBar'
import AniCard from '@/components/AniCard'

import { useSearchPaginated } from '@/api/anilist'

import { useEffect, useState } from 'react'
import { AniListItem, FavedItemsMap } from '@/api/anilist/types'

export default function SearchContainer({ className, favedMap, toggleFav }: {
  className?: string,
  favedMap: FavedItemsMap,
  toggleFav: (item: AniListItem) => void
}) {
  const [query, setQuery] = useState('')

  const { data, error, isFetching, refetch } = useSearchPaginated({ query })

  useEffect(() => {
    refetch()
  }, [query, refetch])

  return (
    <div className={className}>
      <SearchBar value={query} isLoading={isFetching} onChange={setQuery} />
      
      { query ?
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${error || data?.media.length ? 'mt-4' : ''}`}>
        {
          (!isFetching && error) ? 'Error while fetching data' :
          (!isFetching && !data?.media.length) ? 'No data' :
            data?.media.map(item => (
              <AniCard
                key={item.id}
                item={item}
                isFav={favedMap.hasOwnProperty(item.id)}
                toggleFav={() => toggleFav(item)}
              />
            )
          )
        }
      </div>
      : ''}
    </div>
  )
}