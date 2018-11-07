import { DiscoveryStrategy } from './discovery-strategy';
import { DataStore } from './data-store';

export interface IndexMap {
  lastInstanceIndex: number;
  instanceName: string;
}
export class RoundRobinStrategy implements DiscoveryStrategy {
  indexMaps: Array<IndexMap> = [];

  public select(serviceName: string, dataStore: DataStore): string {
    const instances: Array<string> = dataStore.instances;
    let instance: string = '';
    if (this.indexMaps.length <= 0) {
      this.populateInstance(serviceName);
    }
    let instanceIdx = this.indexMaps.findIndex(item => item.instanceName === serviceName);
    if (instanceIdx <= -1) {
      this.populateInstance(serviceName);
      instanceIdx = this.indexMaps.findIndex(item => item.instanceName === serviceName);
    }

    let lastInstanceIndex = this.indexMaps[instanceIdx].lastInstanceIndex;
    if (instances && instances.length > 0) {
      if (instances[++lastInstanceIndex]) {
        instance = instances[lastInstanceIndex];
      } else {
        lastInstanceIndex = 0;
        instance = instances[0];
      }
      this.indexMaps[instanceIdx].lastInstanceIndex = lastInstanceIndex;
    }
    return instance;
  }

  populateInstance(serviceName: string): void {
    const indexMap = <IndexMap>{
      lastInstanceIndex: 0,
      instanceName: serviceName
    }
    this.indexMaps.push(indexMap);
  }
}
