import { AppWindowState } from "./window";

interface ICacheStore {
  setCaches(key: string, value: any): void;
  getCaches(key: string): any;
}

export default class CacheStore implements ICacheStore {
  private readonly container: string;

  constructor(container: string = "RELOAD") {
    this.container = `${container}-CACHE`;
  }

  public setCaches(key: string, value: any): void {
    new AppWindowState(this.container, {
      [key]: value,
    }).set({ updatable: true });
  }

  public getCaches(key: string): any {
    return new AppWindowState(this.container).get()?.[key] || {};
  }

  public isCached(key: string): boolean {
    return !!new AppWindowState(this.container).get()?.[key];
  }
}
