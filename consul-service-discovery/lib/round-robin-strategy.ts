import { DiscoveryStrategy } from './discovery-strategy';
import { DataStore } from './data-store';

export class RoundRobinStrategy implements DiscoveryStrategy {
  lastInstanceIndex: number = 0;

  public select(dataStore: DataStore): string {
    let instance: string = '';
    const instances: Array<string> = dataStore.instances;
    if (instances && instances.length > 0) {
      if (instances[++this.lastInstanceIndex]) {
        instance = instances[this.lastInstanceIndex];
      } else {
        this.lastInstanceIndex = 0;
        instance = instances[0];
      }
    }
    return instance;
  }
}
