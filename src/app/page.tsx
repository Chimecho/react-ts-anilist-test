'use client'

import Button from '@/components/generic/Button'
import SearchContainer from '@/components/SearchContainer'
import FavsContainer from '@/components/FavsContainer'

import { useState } from 'react'

enum MainTabs {
  Search = 1,
  Faved = 2
}

export default function Test() {
  const [currentTab, setCurrentTab] = useState(MainTabs.Search)

  return (
    <main className='flex min-h-screen flex-col p-10 bg-neutral-800 -space-y-px'>
      <div className='flex space-x-1'>
        <Button disabled={currentTab === MainTabs.Search} onClick={() => setCurrentTab(MainTabs.Search)}>Search</Button>
        <Button disabled={currentTab === MainTabs.Faved} onClick={() => setCurrentTab(MainTabs.Faved)}>Faved</Button>
      </div>

      <div className='border border-gray-600 p-4 flex flex-col space-y-4'>
        {currentTab === MainTabs.Search ? <SearchContainer /> : <FavsContainer />}
      </div>
    </main>
  );
}
