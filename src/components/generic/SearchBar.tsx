import { FaSearch, FaTimes } from 'react-icons/fa'

import debounce from 'lodash.debounce'
import { useState, useCallback, useRef, useEffect } from 'react'

interface SearchBarProps {
  value?: string,
  onChange?: Function
}

const DEBOUNCE_TIMEOUT = 300

export default function SearchBar(props: SearchBarProps) {
  const [internalQuery, setInternalQuery] = useState(props.value)
  
  const inputRef = useRef<HTMLInputElement>(null)

  const debouncedEmit = useCallback(
    debounce((query: string): void => {
      props.onChange?.(query)
    }, DEBOUNCE_TIMEOUT)
  , [])

  const handleChange = (query: string): void => {
    setInternalQuery(query)

    if (query) {
      debouncedEmit(query)
    } else {
      debouncedEmit.cancel()
      props.onChange?.(query)
      inputRef.current?.focus()
    }
  }

  useEffect(() => {
    inputRef.current?.focus()
  })

  return (
    <div className='relative'>
      <input
        ref={inputRef}
        className={`w-full border border-gray-600 rounded-sm bg-neutral-900 h-9 pl-10 ${props.value ? 'pr-10' : ''}`}
        type='text'
        onChange={e => handleChange(e.target.value)}
        placeholder='Search'
        value={internalQuery}
      />
      
      <div className='absolute top-0 left-0 h-full flex items-center p-2.5'>
        <FaSearch />
      </div>

      {props.value ? <div className='absolute top-0 right-0 h-full flex items-center p-2.5 cursor-pointer' onClick={e => handleChange('')}>
        <FaTimes />
      </div> : ''}
    </div>
  )
}