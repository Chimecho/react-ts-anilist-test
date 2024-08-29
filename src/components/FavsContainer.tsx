import { AniListItem, FavedItemsMap } from "@/api/anilist/types"
import AniCard from "./AniCard"

export default function FavsContainer({ className, favedMap, toggleFav }: {
  className?: string,
  favedMap: FavedItemsMap,
  toggleFav: (item: AniListItem) => void
}) {
  const favedItems: AniListItem[] = Object.values(favedMap)

  return (
    <div className={className}>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4'>
        {favedItems.length ?
          favedItems.map(item => <AniCard
            key={item.id}
            item={item}
            isFav={favedMap.hasOwnProperty(item.id)}
            toggleFav={() => toggleFav(item)}
          />)
        : 'No faved items yet'}
      </div>
    </div>
  )
}
