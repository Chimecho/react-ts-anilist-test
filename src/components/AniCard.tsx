import Image from "next/image"

export default function AniCard () {
  return (
    <div className='flex md:flex-col border border-gray-700 rounded-sm'>
      <div className='flex justify-center flex-shrink-0'>
        <Image
          src='https://s4.anilist.co/file/anilistcdn/media/anime/cover/large/nx103526-yhlEtUTszUNw.jpg'
          alt='poster'
          width={185}
          height={165}
        />
      </div>
      <div className='bg-neutral-900 p-2.5 text-sm flex-grow space-y-4 overflow-hidden'>
        <div className='text-base truncate'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos voluptatum illum in molestias natus rerum doloremque dolorum aliquam eum eius, laboriosam quo impedit asperiores dignissimos numquam, qui est modi? Laboriosam? name</div>
        <div className='text-gray-400'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Consectetur dolore mollitia eaque officiis doloremque vero reprehenderit, blanditiis itaque magni, iusto aut recusandae dolores temporibus ipsam, iure explicabo minima. Alias, esse!</div>
      </div>
    </div>
  )
}
