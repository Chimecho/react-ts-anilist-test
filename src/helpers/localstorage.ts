import { useEffect, useState } from "react"

const isServer = typeof window === 'undefined'

export class GenericStore<T> {
  private _reader: (input: string | null) => T | undefined
  private _writer: (obj: T) => string

  constructor (private reader: (input: string | null) => T | undefined, private writer: (obj: T) => string) {
    this._reader = reader
    this._writer = writer
  }

  get(key: string, defaultValue: T): T | undefined {
    if (isServer) {
      return defaultValue
    }

    console.log(key, 'try to get from store')
    if (window.localStorage.hasOwnProperty(key)) {
      const item = window.localStorage.getItem(key)
      console.log(key, 'real get from store: ', item)
      return this._reader(item)
    } else {
      return defaultValue
    }
  }

  set(key: string, value: T): boolean {
    try {
      window.localStorage.setItem(key, this._writer(value))
      return true
    } catch (e) {
      return false
    }
  }

  remove(key: string): boolean {
    try {
      window.localStorage.removeItem(key)
      return true
    } catch (e) {
      return false
    }
  }
}

class ObjectStore<T> extends GenericStore<T> {
  constructor() {
    super(
      input => {
        if (input) {
          return JSON.parse(input) as T
        } else {
          return undefined
        }
      },
      obj => JSON.stringify(obj)
    )
  }
}

type Setter<T> = (value: T) => boolean
type Remover = () => boolean

const cache: {[key: string]: Object} = {}
export function useStore<T>(key: string, initialValue: T): [T | undefined, Setter<T>, Remover] {
  const store = new ObjectStore<T>()

  const [ value, setValue ] = useState<T | undefined>(initialValue)

  function setAndCacheValue (val: T | undefined) {
    setValue(val)

    if (val !== undefined && val !== null) {
      cache[key] = val
    }
  }

  useEffect(() => {
    if (!isServer) {
      setAndCacheValue(cache.hasOwnProperty(key) ? cache[key] as T : store.get(key, initialValue))
    }
  }, [])
  
  return [
    value,
    (value) => {
      setAndCacheValue(value)
      return store.set(key, value)
    },
    () => {
      return store.remove(key)
    }
  ]
}
