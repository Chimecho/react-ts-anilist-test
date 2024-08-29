import Fuse from 'fuse.js'

export class Fuzzy<T> {
  fuseObj: Fuse<T>

  constructor (private items: T[], private keys?: string[]) {
    this.fuseObj = new Fuse<T>(
      items,
      {
        shouldSort: true,
        threshold: 0.3,
        location: 0,
        distance: 100,
        minMatchCharLength: 2,
        keys
      }
    )
  }

  search(query: string): T[] {
    query = (query || '').trim()

    if (query) {
      return this.fuseObj.search(query).map(fuseResult => fuseResult.item)
    } else {
      return this.items
    }
  }
}