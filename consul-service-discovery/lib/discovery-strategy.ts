import { DataStore } from "./data-store";

export interface DiscoveryStrategy {
  select(dataStore: DataStore): string;
}
