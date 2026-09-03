type CacheEntry<T> = { value: T; expiresAt: number };

const memoryCache = new Map<string, CacheEntry<unknown>>();

export function getCached<T>(key: string, ttlMs: number, fetcher: () => Promise<T>): Promise<T> {
  const now = Date.now();
  const entry = memoryCache.get(key) as CacheEntry<T> | undefined;

  if (entry && entry.expiresAt > now) {
    return Promise.resolve(entry.value);
  }

  return fetcher().then((value) => {
    memoryCache.set(key, { value, expiresAt: now + ttlMs });
    return value;
  });
}

export function invalidateCache(prefix: string): void {
  for (const key of memoryCache.keys()) {
    if (key.startsWith(prefix)) {
      memoryCache.delete(key);
    }
  }
}

export const CACHE_TTL = {
  bookmarks: 60_000,
  blogPosts: 60_000,
  skills: 120_000,
  experience: 120_000,
  githubStats: 300_000,
  githubEvents: 300_000,
} as const;
