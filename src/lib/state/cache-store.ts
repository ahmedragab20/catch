import { AppWindowState } from "./window";

/**
 * Interface representing a cache store.
 */
interface ICacheStore {
  /**
   * Set the caches for the specified key and value.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  setCaches(key: string, value: any): void;

  /**
   * Get the caches for the specified key.
   * @param key - The cache key.
   * @returns The cache value.
   */
  getCaches(key: string): any;

  /**
   * Check if a specific key is cached.
   * @param key - The cache key.
   * @returns True if the key is cached, false otherwise.
   */
  isCached(key: string): boolean;
}

/**
 * CacheStore class implementing the ICacheStore interface.
 */
export default class CacheStore implements ICacheStore {
  /**
   * The container name for the cache store.
   */
  private readonly container: string;

  /**
   * Create a new instance of the CacheStore class.
   * @param container - The container name for the cache store. Default is "RELOAD".
   */
  constructor(container: string = "RELOAD") {
    this.container = `${container}-CACHE`;
  }

  /**
   * Set the caches for the specified key and value.
   * @param key - The cache key.
   * @param value - The cache value.
   */
  public setCaches(key: string, value: any): void {
    new AppWindowState(this.container, {
      [key]: value,
    }).set({ updatable: true });
  }

  /**
   * Get the caches for the specified key.
   * @param key - The cache key.
   * @returns The cache value.
   */
  public getCaches(key: string): any {
    return new AppWindowState(this.container).get()?.[key] || {};
  }

  /**
   * Check if a specific key is cached.
   * @param key - The cache key.
   * @returns True if the key is cached, false otherwise.
   */
  public isCached(key: string): boolean {
    return !!new AppWindowState(this.container).get()?.[key];
  }
}
