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

  // instanceData: Array<any> = [];

  //   constructor() { }

  //   add(instance: any): void {
  //       this.instanceData.push(instance);
  //   }

  //   clear(): void {
  //       this.instanceData = [];
  //   }

  //   get(id: string): any {
  //       const idx = this.instanceData.findIndex(item => item.id === id);
  //       if(idx > -1) {
  //           return this.instanceData[idx];
  //       }
  //       return null;
  //   }
    
  //   findInstancesByName(name: string): Array<any> {
  //      return this.instanceData.find(item => item.name === name);
  //   }
    
  //   findInstancesByServiceId(serviceId: string): Array<any> {
  //      return this.instanceData.find(item => item.serviceId === serviceId);
  //   }
}
