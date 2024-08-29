import SearchBar from '@/components/generic/SearchBar'
import AniCard from '@/components/AniCard'

import { useSearchPaginated } from '@/api/anilist'

import { useEffect, useState } from 'react'
import { useQuery } from 'react-query'

export default function SearchContainer() {
  const [query, setQuery] = useState('')

  const { data, error, isFetching, refetch } = useSearchPaginated({ query })

  useEffect(() => {
    refetch()
  }, [query, refetch])

  return (
    <>
      <SearchBar value={query} isLoading={isFetching} onChange={setQuery} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {data?.media.map(item => (<AniCard key={item.id} item={item} />))}
      </div>
    </>
  )
}