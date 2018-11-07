import { DataStore } from "./data-store";

export interface DiscoveryStrategy {
  select(serviceName: string, dataStore: DataStore): string;
}
