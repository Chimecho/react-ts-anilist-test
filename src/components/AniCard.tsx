import { FaStar, FaRegStar, FaTimes } from 'react-icons/fa'

import { AniListItem } from "@/api/anilist/types"

import Image from "next/image"
import { useState } from 'react'

interface AniCardProps {
  item: AniListItem,
  isFav: boolean,
  toggleFav: () => void
}

export default function AniCard ({ item, isFav, toggleFav }: AniCardProps) {
  const [showMoreInfo, setShowMoreInfo] = useState(false)
  const title = item.title.english || item.title.romaji || item.title.native

  return (
    <div className='relative flex md:flex-col border border-gray-700 rounded-sm transition-transform' style={{transform: showMoreInfo ? 'rotate3d(0, 1, 0, 180deg)' : ''}}>
      <div className='relative flex justify-center flex-shrink-0 w-52 md:w-full h-80 cursor-pointer' onClick={() => setShowMoreInfo(!showMoreInfo)}>
        <div className='absolute top-0 left-0 w-full h-full overflow-hidden'>
          <Image
            src={ item.coverImage.large || item.coverImage.medium }
            alt={title}
            fill
            className='object-cover blur-md brightness-75 filter-blur'
            sizes='50vw'
          />
        </div>

        <Image
          src={ item.coverImage.large || item.coverImage.medium }
          alt={title}
          fill
          className='object-contain'
          sizes='50vw'
        />
      </div>
      <div className={`bg-neutral-900 p-2.5 text-sm flex-grow space-y-4 max-h-80 md:max-h-56 flex flex-col overflow-hidden`}>
        <div className='flex max-w-full justify-between items-center space-x-2'>
          <div className='text-base truncate max-w-full flex-shrink' title={item.title.native}>{title}</div>
          <button className='p-2 flex-shrink-0 cursor-pointer' onClick={() => toggleFav()}>
            {isFav ? <FaStar className='text-yellow-500' /> : <FaRegStar />}
          </button>
        </div>
        <div className='text-gray-400 overflow-auto' dangerouslySetInnerHTML={{__html: item.description}}></div> {/* I know this shouldn't be done without sanitizing it and etc, but some item descriptions use html tags and look awful as plain text */}
      </div>

      <div className={`absolute top-0 left-0 flex flex-col w-full h-full transition-all py-2 bg-neutral-900 ${showMoreInfo ? 'opacity-100 z-10' : 'opacity-0 pointer-events-none'}`} style={{transform: showMoreInfo ? 'rotate3d(0, 1, 0, 180deg)' : ''}}>
        <div className='flex max-w-full justify-between items-center space-x-2 flex-shrink-0'>
          <div className='pl-4 text-base truncate max-w-full flex-shrink' title={item.title.native}>{title}</div>
          <button className='p-2 pr-3.5 flex-shrink-0 cursor-pointer' onClick={() => setShowMoreInfo(false)}>
            <FaTimes />
          </button>
        </div>
        <div className='px-4 text-gray-400 text-xs'>{item.startDate.year} - {item.endDate.year}</div>

        <div className="px-4 mt-4 overflow-auto text-sm space-y-2">
          {item.episodes ? <div>Episodes: {<span className='text-gray-400'>{item.episodes}</span>}</div> : ''}
          <div>Characters:</div>
          <div className='grid grid-cols-4 md:grid-cols-2 gap-4'>
            {item.characters.nodes.map(character => (
              <div key={character.id} className='flex flex-col items-center'>
                <div className='relative w-20 h-20 rounded-full overflow-hidden'>
                  {showMoreInfo && character.image.medium ?
                    <Image
                      src={character.image.medium}
                      alt={character.name.full}
                      fill
                      className='object-cover'
                      sizes='50vw'
                    />
                  : '?'}
                </div>
                <div className='text-xs text-center'>{character.name.full}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
