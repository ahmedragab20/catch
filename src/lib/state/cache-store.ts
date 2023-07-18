import { TCacheStrategy } from "../types";

export default class CacheStore {
  static readonly caches: Map<string, any> = new Map<string, any>();

  static setCaches(key: TCacheStrategy, value: any): void {
    CacheStore.caches.set(key, value);
  }
  static getCaches(key: TCacheStrategy): any {
    return CacheStore.caches.get(key);
  }
}
