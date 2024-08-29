import SearchBar from '@/components/generic/SearchBar'
import AniCard from '@/components/AniCard'

import { useState } from 'react'

export default function SearchContainer() {
  const [query, setQuery] = useState('')

  return (
    <>
      <SearchBar value={query} onChange={setQuery} />

      <div className='grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-4'>
        {'.'.repeat(40).split('').map((card, idx) => (<AniCard key={idx} />))}
      </div>
    </>
  )
}