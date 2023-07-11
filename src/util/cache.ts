import { AuthorizationOptions, ItemTypes, PaginatedInstance,
  PaginatedRequestParams, PaginatedResponse, PaginatedType } from '..'
import { findArrayFrom } from '.'

/**
 * @ignore
 */
export class Cache {
  /**
  * The plan is to deprecate this global map as soon as the below maps are
  * fully-featured.
  */
  private static map: Map<string, CacheItem> = new Map()

  /** 
   * Map of items that are separated by which parts were requested from the API and then
   * their ID/URL/search query.
   */
  private static itemsMap:
  Map<string, Map<string, CacheItem<InstanceType<ItemTypes>>>> = new Map()

  /** 
   * Map of pages of items that are separated by which parts were requested from the API
   * and then a cache key generated from the request options.
   */
  private static pagesMap:
    Map<string, Map<string, CacheItem<PaginatedResponse<PaginatedInstance>>[]>> = new Map()

  public static set (key: string, value: any, ttl: number) {
    Cache.map.set(key, { v: value, t: ttl })
  }

  public static get (key: string): any {
    const item = Cache.map.get(key)

    if (!item || (item.t > 0 && new Date().getTime() >= item.t)) {
      Cache._delete(key)
      return undefined
    }

    return item.v
  }

  public static setItem (type: ItemTypes, name: string, parts: string[] | undefined,
    value: InstanceType<ItemTypes>, ttl: number) {
    const key = `${type.name.toLowerCase()}/${name}` // The item key string
    const part = parts ? parts.sort().join(',') : type.part // The parts key string
    const cachedWithSameParts = Cache.itemsMap.get(part) ?? // The parts map
      Cache.itemsMap.set(part, new Map()).get(part)

    cachedWithSameParts.set(key, { v: value, t: ttl })
  }

  public static getItem (type: ItemTypes, name: string, parts?: string[]):
  InstanceType<ItemTypes> {
    const part = parts ? parts.sort().join(',') : type.part
    const key = `${type.name.toLowerCase()}/${name}`

    // Search for an item that has the same or more parts than we need
    const item = Cache.findCachedItemWithParts(Cache.itemsMap, part, key)

    if (!item) return undefined
    if (item.t > 0 && new Date().getTime() >= item.t) {
      Cache._deleteItem(key, part)
      return undefined
    }

    return item.v
  }

  public static setPage (endpoint: string, page: number,
    options: PaginatedRequestParams, auth: AuthorizationOptions | undefined,
    parts: string[] | undefined, type: PaginatedType | undefined,
    value: PaginatedResponse<PaginatedInstance>, ttl: number) {

    const part = parts ? parts.sort().join(',') : type?.part ?? 'default'
    const key = `${endpoint}/${
      JSON.stringify({ ...options, pageToken: undefined, part: undefined })}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`

    const cachedWithSameParts = Cache.pagesMap.get(part) ??
      Cache.pagesMap.set(part, new Map()).get(part)
    const toCache = cachedWithSameParts.get(key) ?? []

    if (page > toCache.length - 1) toCache.length = page + 1
    toCache[page] = { v: value, t: ttl }

    cachedWithSameParts.set(key, toCache)
  }

  public static getPages<T extends PaginatedInstance = PaginatedInstance> (
    endpoint: string, options: PaginatedRequestParams,
    auth?: AuthorizationOptions, parts?: string[], type?: PaginatedType):
  PaginatedResponse<T>[] {
    const key = `${endpoint}/${
      JSON.stringify({ ...options, pageToken: undefined, part: undefined })}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`
    const part = parts ? parts.sort().join(',') : type?.part ?? 'default'

    // Search for a page that has the same or more parts than we need
    const pages = Cache.findCachedItemWithParts(Cache.pagesMap, part, key)

    if (!pages) return undefined

    const toReturn: PaginatedResponse<T>[] = new Array(pages.length)

    for (let page = 0; page < pages.length; page++) {
      const item = pages[page]

      if (!item) continue
      if (item.t > 0 && new Date().getTime() >= item.t) {
        Cache._deletePage(endpoint, page, options, auth, parts, type)
        continue
      }

      toReturn[page] = item.v as PaginatedResponse<T>
    }

    return toReturn
  }

  private static findCachedItemWithParts<T> (cache: Map<string, Map<string, T>>,
    part: string, key: string): T {
    let cachedWithSameParts = cache.get(part) // A map with matching parts
    let item = cachedWithSameParts?.get(key) // A matching page with our parts

    if (item) return item

    let currentIndex = 0
    const partKeys = Array.from(cache.keys())

    while (!item) {
      // Find a page that contains our data
      const matchingPart = findArrayFrom(p => p.includes(part),
        partKeys, currentIndex)
      if (!matchingPart) break

      currentIndex = matchingPart[0] + 1 // Increment index
      cachedWithSameParts = cache.get(matchingPart[1])
      item = cachedWithSameParts?.get(key)
    }

    return item
  }

  public static checkTTLs () {
    const time = new Date().getTime()

    for (const [ key, value ] of Cache.map.entries()) {
      const timeToDelete = value.t

      if (timeToDelete > 0 && time >= timeToDelete) {
        Cache.map.delete(key)
      }
    }

    for (const [ part, cache ] of Cache.itemsMap.entries()) {
      for (const [ key, item ] of cache.entries()) {
        const timeToDelete = item.t

        if (timeToDelete > 0 && time >= timeToDelete) {
          Cache._deleteItem(key, part)
        }
      }
    }

    for (const [ part, cache ] of Cache.pagesMap.entries()) {
      for (let [ key, pages ] of cache.entries()) {
        for (let page = 0; page < pages.length; page++) {
          if (!pages[page]) continue

          const timeToDelete = pages[page].t
          if (timeToDelete > 0 && time >= timeToDelete) {
            pages = Cache._deletePageByKey(part, key, page)
            page--
          }
        }
      }
    }
  }

  public static setTTLs (ttl: number) {
    for (const [ key, item ] of Cache.map.entries()) {
      Cache.map.set(key, { ...item, t: ttl })
    }

    for (const cache of Cache.itemsMap.values()) {
      for (let [ key, item ] of cache.entries()) {
        cache.set(key, { ...item, t: ttl })
      }
    }

    for (const cache of Cache.pagesMap.values()) {
      for (let [ key, pages ] of cache.entries()) {
        for (let page = 0; page < pages.length; page++) {
          if (!pages[page]) continue

          pages[page].t = ttl
          cache.set(key, pages)
        }
      }
    }
  }

  public static _delete (key: string) {
    Cache.map.delete(key)
  }

  public static _deleteItem (key: string, parts: string) {
    const cachedWithSameParts = Cache.itemsMap.get(parts)
    const cachedItem = cachedWithSameParts?.get(key)

    cachedWithSameParts?.delete(key)
    return cachedItem
  }

  /**
   * @returns Pages left in the key
   */
  public static _deletePageByKey (parts: string, key: string, page: number) {
    const cachedItems = Cache.pagesMap.get(parts)
    const pages = cachedItems?.get(key)

    if (!pages) return
    if (page > pages.length - 1) return pages

    pages.splice(page, 1)

    if (pages.length === 0) {
      cachedItems.delete(key)
    } else {
      cachedItems.set(key, pages)
    }

    return pages
  }

  /**
   * @returns Pages left in the key
   */
  public static _deletePage (endpoint: string, page: number,
    options: PaginatedRequestParams, auth?: AuthorizationOptions, parts?: string[],
    type?: PaginatedType) {

    const part = parts ? parts.sort().join(',') : type?.part ?? 'default'
    const key = `${endpoint}/${
      JSON.stringify({ ...options, pageToken: undefined, part: undefined })}/${
      auth?.accessToken ?? false}/${auth?.apiKey ?? false}`

    return Cache._deletePageByKey(part, key, page)
  }
}

/**
 * @ignore
 * v = Value  
 * t = Time to live  
 * p = Parts string (sorted!)
 */
type CacheItem<T = any> = {
  v: T
  t: number
}
