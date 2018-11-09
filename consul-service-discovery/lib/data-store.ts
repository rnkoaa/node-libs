import { ServiceInstance } from "./types/consul";
export class DataStore {
  _instances: Array<ServiceInstance>;

  constructor() {
    this._instances = [];
  }

  public get instances(): Array<ServiceInstance> {
    return this._instances;
  }

  public clear(): void {
    this._instances = [];
  }

  public set instances(_instances: Array<ServiceInstance>) {
    this._instances = _instances;
  }

  public addInstance(instance: ServiceInstance): void {
    if (!instance.serviceId) {
      throw new Error("instance service Id is required.")
    }
    // remove an instance with the same serviceId if it exists
    // if it does not exist, nothing will happen.
    this.removeIfExists(instance.serviceId);

    // then add the new instance to the list
    this._instances.push(instance);
  }

  public removeById(id: string): void {
    const idx = this._instances.findIndex(item => item.id === id);
    if (idx > -1) {
      this.instances.splice(idx, 1);
    }
  }

  public remove(serviceId: string): void {
    const idx = this._instances.findIndex(item => item.serviceId === serviceId);
    if (idx > -1) {
      this.instances.splice(idx, 1);
    }
  }

  // overloaded method to indicate that nothing happens if it does not exist.
  public removeIfExists(serviceId: string): void {
    this.remove(serviceId);
  }

  findById(id: string): ServiceInstance {
    const idx = this._instances.findIndex(item => item.id === id);
    if (idx > -1) {
      return this._instances[idx];
    }
    return <ServiceInstance>{};
  }

  findInstancesByName(name: string): Array<ServiceInstance> {
    return this._instances.filter(item => item.serviceName === name);
  }

  findInstancesByServiceId(serviceId: string): Array<ServiceInstance> {
    return this._instances.filter(instance => instance.serviceId === serviceId);
  }
}
