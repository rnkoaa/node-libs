import { DiscoveryStrategy } from './discovery-strategy';
import { DataStore } from './data-store';

export class RandomStrategy implements DiscoveryStrategy {
  public select(serviceName: string, dataStore: DataStore): string {
    // throw new Error('Method not implemented.');
    // if (storedServicesData[++self.lastInstanceIndex]) {
    //     serviceData = storedServicesData[self.lastInstanceIndex];
    // } else {
    //     self.lastInstanceIndex = 0;
    //     serviceData = storedServicesData[0];
    // }
    
    return 'random';
  }
}
