import { TCacheStrategy } from "../types";
import { supportedCachingStrategy, cachingStrategies } from "./helpers";
import CacheStore from "../state/cache-store";

export default class Cache {
  // TODO:: add remove cache method with key
  // TODO:: add clear cache method (all)
  // TODO:: add update cache method with key
  private readonly _key: string = "NO-CACHE";
  private _cachedKeys: string[] = [];

  constructor(k: TCacheStrategy) {
    if (!supportedCachingStrategy(k)) {
      throw new Error(
        `Invalid caching strategy. Expected one of: ` + cachingStrategies()
      );
    }

    this._key = k?.toUpperCase();
  }

  public set cachedKeys(value: string) {
    if (
      !value ||
      !this._cachedKeys?.length ||
      this._cachedKeys.includes(value.toString())
    ) {
      return;
    }

    this._cachedKeys.push(value.toString());
  }

  public get cachedKeys(): string[] {
    return this._cachedKeys;
  }

  public isCached(key: string): boolean {
    if (this._key === "NO-CACHE") {
      return this._cachedKeys.some((k) => k === key);
    } else if (this._key === "PER-SESSION") {
      return (
        typeof this.getCacheReload(key) === "object" &&
        !!Object.keys(this.getCachePerSession(key)).length
      );
    } else if (this._key === "RELOAD") {
      return (
        typeof this.getCacheReload(key) === "object" &&
        !!Object.keys(!!this.getCacheReload(key)).length
      );
    } else {
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

    console.log({
      method: this._key,
      key,
      value,
      cache: this.cache,
    });

    //TODO:: useless but will back it later to make analyze the all the apis per session and filter the duplicated ones to speed up the app
  };

  private readonly getCacheNoCache = (key: string): any => {
    return {};

    //TODO:: useless but will back it later to make analyze the all the apis per session and filter the duplicated ones to speed up the app
  };

  private readonly setCachePerSession = (key: string, value: any): void => {
    this.cache.set("PER-SESSION", {
      [key]: value,
    });

    console.log({
      method: this._key,
      key,
      value,
      cache: this.cache,
    });

    if (window) {
      // set that in the session storage
      const sessionCache = window.sessionStorage.getItem("PER-SESSION");

      if (sessionCache) {
        // convert to array
        const parsedSessionCache = JSON.parse(sessionCache);

        parsedSessionCache[key] = value;

        window.sessionStorage.setItem(
          "PER-SESSION",
          JSON.stringify(parsedSessionCache)
        );

        return;
      }

      window.sessionStorage.setItem(
        "PER-SESSION",
        JSON.stringify({ [key]: value })
      );
    }
  };

  private readonly getCachePerSession = (key: string): any => {
    if (window) {
      const sessionCache = window.sessionStorage.getItem("PER-SESSION");

      if (sessionCache) {
        const parsedSessionCache = JSON.parse(sessionCache);

        return parsedSessionCache[key] || {};
      }
    }
  };

  private readonly setCacheReload = (key: string, value: any): void => {
    this.cache.set("RELOAD", {
      [key]: value,
    });

    CacheStore.setCaches("RELOAD", {
      [key]: value,
    });

    console.log({
      method: this._key,
      key,
      value,
      cache: this.cache,
      storedCache: this.getCacheReload(key),
    });
  };

  private readonly getCacheReload = (key: string): any => {
    // convert the cache to an array and filter it by the key

    const cache = CacheStore.getCaches("RELOAD");

    return cache?.[key] || {};
  };

  public set(key: string, value: any): void {
    if (!key || !value || typeof key !== "string") {
      throw new Error(
        "You must provide a key and a value, and the key must be a string"
      );
    }

    if (!this.isCached(key)) {
      this._cachedKeys.push(key);
    }

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
