import { TCacheStrategy } from "../types";
import { supportedCachingStrategy, cachingStrategies } from "./helpers";
import CacheStore from "../state/cache-store";

export default class Cache {
  // TODO:: add remove cache method with key
  // TODO:: add clear cache method (all)
  // TODO:: add update cache method with key
  private readonly _key: string = "NO-CACHE";
  private _cachedKeys = new Set<string>();

  constructor(k: TCacheStrategy) {
    if (!supportedCachingStrategy(k)) {
      throw new Error(
        `Invalid caching strategy. Expected one of: ` + cachingStrategies()
      );
    }

    this._key = k?.toUpperCase();
  }

  public set cachedKeys(value: string) {
    this._cachedKeys.add(value);
  }

  public get cachedKeys(): string[] {
    return Array.from(this._cachedKeys);
  }

  public isCached(key: string): boolean {
    switch (this._key) {
      case "NO-CACHE":
        return (
          typeof this.getCacheNoCache(key) === "object" &&
          !!this.getCacheNoCache(key) &&
          Object.keys(this.getCacheNoCache(key)).length > 0
        );
      case "PER-SESSION":
        return (
          typeof this.getCachePerSession(key) === "object" &&
          !!this.getCachePerSession(key) &&
          Object.keys(this.getCachePerSession(key)).length > 0
        );
      case "RELOAD":
        return (
          typeof this.getCacheReload(key) === "object" &&
          !!this.getCacheReload(key) &&
          Object.keys(this.getCacheReload(key)).length > 0
        );
      default:
        return false;
    }
  }

  private readonly cache: Map<TCacheStrategy, any> = new Map<
    TCacheStrategy,
    any
  >();

  private readonly setCacheNoCache = (key: string, value: any): void => {
    this.cache.set("NO-CACHE", {
      [key]: value,
    });
    //[TODO]:: useless but will back it later to make analyze the all the apis per session and filter the duplicated ones to speed up the app
  };

  private readonly getCacheNoCache = (key: string): any => {
    return {};

    //[TODO]:: useless but will back it later to make analyze the all the apis per session and filter the duplicated ones to speed up the app
  };

  private readonly setCachePerSession = (key: string, value: any): void => {
    this.cache.set("PER-SESSION", {
      [key]: value,
    });

    if (window) {
      // set that in the session storage
      const sessionCache = window.sessionStorage.getItem("PER-SESSION");

      if (sessionCache) {
        const parsedSessionCache = JSON.parse(sessionCache);

        window.sessionStorage.setItem(
          "PER-SESSION",
          JSON.stringify({
            ...parsedSessionCache,
            [key]: value,
          })
        );

        return;
      }

      window.sessionStorage.setItem(
        "PER-SESSION",
        JSON.stringify({
          [key]: value,
        })
      );
    }
  };

  private readonly getCachePerSession = (key: string): any => {
    if (window) {
      const sessionCache = window.sessionStorage.getItem("PER-SESSION");

      if (sessionCache) {
        const parsedSessionCache = JSON.parse(sessionCache) || {};

        return parsedSessionCache?.[key] || {};
      }
    }
  };

  private readonly setCacheReload = (key: string, value: any): void => {
    this.cache.set("RELOAD", {
      [key]: value,
    });

    new CacheStore("RELOAD").setCaches(key, value);
  };

  private readonly getCacheReload = (key: string): any => {
    // convert the cache to an array and filter it by the key

    const cache = new CacheStore(this._key);

    return cache.getCaches(key) || {};
  };

  public set(key: string, value: any): void {
    if (!key || !value || typeof key !== "string") {
      throw new Error(
        "You must provide a key and a value, and the key must be a string"
      );
    }

    this._cachedKeys.add(key);

    switch (this._key) {
      case "NO-CACHE":
        // this.setCacheNoCache(key, value); TODO:: add it later
        break;
      case "PER-SESSION":
        this.setCachePerSession(key, value);
        break;

      case "RELOAD":
        this.setCacheReload(key, value);
        break;

      default:
        break;
    }
  }

  public get(key: string): any {
    if (!key) {
      throw new Error("You must provide a key");
    }

    switch (this._key) {
      case "NO-CACHE":
        return {}; // this.getCacheNoCache(key);
      case "PER-SESSION":
        return this.getCachePerSession(key);
      case "RELOAD":
        return this.getCacheReload(key);

      default:
        break;
    }
  }
}
