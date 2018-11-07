export class DataStore {
  _instances: Array<string>;

  constructor() {
    this._instances = [];
  }

  public get instances(): Array<string> {
    return this._instances;
  }

  public clear(): void {
    this._instances = [];
  }

  public set instances(_instances: Array<string>) {
    this._instances = _instances;
  }

  public addInstance(instance: string): void {
    this._instances.push(instance);
  }
}
