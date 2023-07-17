declare global {
  interface Window {
    $catch: Promise<any>;
    [key: string]: any;
  }
}

export class AppWindowState {
  private newState: any;
  private key: string;

  constructor(key: string, newState: any) {
    this.newState = newState;
    this.key = key;
  }

  public set(): void {
    if (!this.key) {
      throw new Error("You must provide a key to set the state");
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
}
