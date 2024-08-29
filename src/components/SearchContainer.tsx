import SearchBar from '@/components/generic/SearchBar'
import AniCard from '@/components/AniCard'

import { useSearchPaginated } from '@/api/anilist'
import { useStore } from '@/helpers/localstorage'

import { useEffect, useState } from 'react'
import { AniListItem, FavedItemsMap } from '@/api/anilist/types'

export default function SearchContainer({ className, favedMap, toggleFav }: {
  className?: string,
  favedMap?: FavedItemsMap,
  toggleFav: (item: AniListItem) => void
}) {
  const [query, setQuery] = useStore('backend-query', '')
  const [oldQuery, setOldQuery] = useState(query)

  const { request: { data, error, isFetching, refetch }, canceller } = useSearchPaginated({ query })

  useEffect(() => {
    if ((oldQuery || undefined) !== (query || undefined)) {
      canceller()
      refetch()
    }

    setOldQuery(query)
  }, [query])

  return (
    <div className={className}>
      <SearchBar value={query || ''} isLoading={isFetching} onChange={setQuery} />
      
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 ${data?.media.length || !isFetching ? 'mt-4' : ''} ${isFetching ? 'pointer-events-none opacity-50' : ''}`}>
        {
          (!isFetching && error) ? 'Error while fetching data' :
          (!isFetching && !data?.media.length) ? 'No data' :
            data?.media.map(item => (
              <AniCard
                key={item.id}
                item={item}
                isFav={favedMap?.hasOwnProperty(item.id) ?? false}
                toggleFav={() => toggleFav(item)}
              />
            )
          )
        }
      </div>
    </div>
  )
}