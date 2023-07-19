declare global {
  interface Window {
    $catch: Promise<any>;
    [key: string]: any;
  }
}

interface ISetOpts {
  updatable: boolean;
}

interface IAppWindowState {
  set(opts: ISetOpts): void;
  get(): any;
  remove(): void;
  update(newState: any): void;
}

export class AppWindowState implements IAppWindowState {
  private newState: any;
  private key: string;

  constructor(key: string, newState?: any) {
    this.newState = newState;
    this.key = key;
  }

  public set(opts?: ISetOpts): void {
    if (!this.key) {
      throw new Error("You must provide a key to set the state");
    } else if (!this.newState) {
      throw new Error("You must provide a new state to set the state");
    } else if (window && window[this.key] && !opts?.updatable) {
      throw new Error(
        `The key ${this.key} already exists, please provide a different key`
      );
    }

    if (opts?.updatable && window && window[this.key]) {
      const oldState = window[this.key];
      const newState = this.newState;
      const mergedState = { ...oldState, ...newState };

      this.update(mergedState);

      return;
    }

    if (window) {
      Object.assign(window, {
        [this.key]: this.newState,
      });
    }
  }

  public get(): any {
    if (window) {
      return window[this.key];
    }
  }

  public remove(): void {
    if (window) {
      delete window[this.key];
    }
  }

  public update(newState: any): void {
    if (window) {
      Object.assign(window, {
        [this.key]: newState,
      });
    }
  }
}
