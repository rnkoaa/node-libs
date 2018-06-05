export interface HealthNode {
  ID: string;
  Node: string;
  Address: string;
  Datacenter: string;
  TaggedAddresses: TaggedAddresses;
  Meta?: NodeMeta;
  CreateIndex?: number;
  ModifyIndex?: number;
}

export interface HealthCheck {
  Node: string;
  CheckID: string;
  Name: string;
  Status: string;
  Notes: string;
  Output: string;
  ServiceId: string;
  ServiceName: string;
  ServiceTags: string[];
  Definition?: any;
  CreateIndex: number;
  ModifyIndex: number;
}

export interface HealthService {
  ID: string;
  Service: string;
  Tags: string[];
  Address: string;
  Meta?: string;
  Port: number;
  CreateIndex?: number;
  ModifyIndex?: number;
  EnableTagOverride?: boolean;
}

export interface TaggedAddresses {
  lan: string;
  wan: string;
}
export interface NodeMeta {
  consulNetworkSegment: string;
}
