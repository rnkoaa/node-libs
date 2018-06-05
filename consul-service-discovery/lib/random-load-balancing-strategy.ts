"use strict";

import { ServiceInstance, ConsulOperations, HealthService } from ".";
import { ServiceInstanceCache } from "./service-instance-cache";

export class RandomLoadBalancingStrategy {
  private _serviceInstances: ServiceInstance[];
  private _consulOperations: ConsulOperations;
  private _serviceInstanceCache = ServiceInstanceCache.getInstance();

  constructor(consulOperations: ConsulOperations) {
    this._serviceInstances = [];
    this._consulOperations = consulOperations;
  }

  public async getServiceInstance(instance: string): Promise<ServiceInstance> {
    const instances: ServiceInstance[] = this._serviceInstanceCache.get(instance);
    if (instances.length > 0) {
      return new Promise<ServiceInstance>((resolve, reject) => {
        if (instances.length === 1) {
          resolve(instances[0]);
        } else {
          const index = this.getRandomIndex(instances.length);
          resolve(instances[index]);
        }
      });
    } else {
      const instancesPromise = await this._consulOperations.getService(instance);
      return new Promise<ServiceInstance>((resolve, reject) => {
        if (instances.length === 1) {
          resolve(ServiceInstance.convert(instancesPromise[0]));
        } else {
          const index = this.getRandomIndex(instances.length);
          resolve(ServiceInstance.convert(instancesPromise[index]));
        }
      });
    }
  }

  private getRandomIndex(maxInt: number): number {
    return Math.floor(Math.random() * maxInt);
  }
}
