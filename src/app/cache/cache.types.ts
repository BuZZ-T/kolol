export type CacheEntry<T> = {
    set(value: T): void;
    get(): T | undefined;
}

export type InternalCacheEntry<T> = CacheEntry<T> & {
    value: T | undefined;
}
