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

  const { request: { data, error, isFetching, refetch }, canceller } = useSearchPaginated({ query })

  useEffect(() => {
    canceller()
    refetch()
  }, [query, refetch])

  return (
    <div className={className}>
      <SearchBar value={query} isLoading={isFetching} onChange={setQuery} />
      
      { query ?
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${data?.media.length || !isFetching ? 'mt-4' : ''} ${isFetching ? 'pointer-events-none opacity-50' : ''}`}>
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