import Image from "next/image"

import { AniListItem } from "@/api/anilist/types"

interface AniCardProps {
  item: AniListItem
}

export default function AniCard ({ item }: AniCardProps) {
  const title = item.title.english || item.title.romaji

  return (
    <div className='flex md:flex-col border border-gray-700 rounded-sm'>
      <div className='relative flex justify-center flex-shrink-0 w-52 md:w-full h-80'>
        <Image
          src={ item.coverImage.large || item.coverImage.medium }
          alt={title}
          width={0}
          height={0}
          layout='fill'
          objectFit='contain'
        />
      </div>
      <div className='bg-neutral-900 p-2.5 text-sm flex-grow space-y-4 max-h-full max-h-80 md:max-h-56 flex flex-col overflow-hidden'>
        <div className='text-base truncate max-w-full flex-shrink-0' title={title}>{title}</div>
        <div className='text-gray-400 overflow-auto' dangerouslySetInnerHTML={{__html: item.description}}></div> {/* I know this shouldn't be done without sanitizing it and etc, but some item descriptions use html tags and look awful as plain text */}
      </div>
    </div>
  )
}
