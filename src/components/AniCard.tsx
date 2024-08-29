import { FaStar, FaRegStar } from 'react-icons/fa'

import { AniListItem } from "@/api/anilist/types"

import Image from "next/image"

interface AniCardProps {
  item: AniListItem,
  isFav: boolean,
  toggleFav: () => void
}

export default function AniCard ({ item, isFav, toggleFav }: AniCardProps) {
  const title = item.title.english || item.title.romaji

  return (
    <div className='flex md:flex-col border border-gray-700 rounded-sm'>
      <div className='relative flex justify-center flex-shrink-0 w-52 md:w-full h-80'>
        <Image
          src={ item.coverImage.large || item.coverImage.medium }
          alt={title}
          width={0}
          height={0}
          fill
          className='object-contain'
          sizes='50vw'
        />
      </div>
      <div className='bg-neutral-900 p-2.5 text-sm flex-grow space-y-4 max-h-full max-h-80 md:max-h-56 flex flex-col overflow-hidden'>
        <div className='flex max-w-full justify-between items-center space-x-2'>
          <div className='text-base truncate max-w-full flex-shrink' title={title}>{title}</div>
          <div className='p-2 flex-shrink-0 cursor-pointer' onClick={() => toggleFav()}>
            {isFav ? <FaStar className='text-yellow-500' /> : <FaRegStar />}
          </div>
        </div>
        <div className='text-gray-400 overflow-auto' dangerouslySetInnerHTML={{__html: item.description}}></div> {/* I know this shouldn't be done without sanitizing it and etc, but some item descriptions use html tags and look awful as plain text */}
      </div>
    </div>
  )
}
