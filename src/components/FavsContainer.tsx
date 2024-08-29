import SearchBar from "./generic/SearchBar"
import AniCard from "./AniCard"
import { AniListItem, FavedItemsMap } from "@/api/anilist/types"

import Fuzzy from "@/helpers/fuzzy"

import { useEffect, useState } from "react"

export default function FavsContainer({ className, favedMap, toggleFav }: {
  className?: string,
  favedMap?: FavedItemsMap,
  toggleFav: (item: AniListItem) => void
}) {
  const [query, setQuery] = useState('')
  const [fuzzy, setFuzzy] = useState<Fuzzy<AniListItem>>()
  
  useEffect(() => {
    const favedItems: AniListItem[] = favedMap ? Object.values(favedMap) : []
    setFuzzy(
      new Fuzzy<AniListItem>(favedItems, ['title.english', 'title.native', 'title.romaji'])
    )
  }, [favedMap])
  
  const filteredItems = fuzzy?.search(query) ?? []

  return (
    <div className={className}>
      <SearchBar value={query} onChange={setQuery} />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mt-4'>
        {filteredItems.length ?
          filteredItems.map(item => <AniCard
            key={item.id}
            item={item}
            isFav={favedMap?.hasOwnProperty(item.id) ?? false}
            toggleFav={() => toggleFav(item)}
          />)
        : (query ? 'No matching items found' : 'No faved items yet')}
      </div>
    </div>
  )
}
