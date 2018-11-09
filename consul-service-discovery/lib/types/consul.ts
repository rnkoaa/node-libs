export interface ConsulInstance {
    Name: string;
    ID: string;
    Address: string;
    Port: number;
}

export interface ConsulServiceHealthResponse {
    Node: ConsulNodeResponse;
    Service: ConsulServiceResponse;
    Checks: Array<ConsulNodeCheckResponse>
}

export interface ConsulNodeCheckResponse {
    Node?: string;
    CheckID?: string;
    Name?: string;
    Status?: string;
    Notes?: string;
    Output?: string;
    ServiceId?: string;
    ServiceName?: string;
    ServiceTags?: Array<any>;
    Definition?: any;
    TTL?: string;
    CreateIndex?: number;
    ModifyIndex?: number;
    DeregisterCriticalServiceAfter?: string;
}

export interface ConsulNodeResponse {
    ID: string;
    Node: string;
    Address: string;
    Datacenter: string;
    TaggedAddresses?: TaggedAddresses
    Meta?: any;
    CreateIndex: number;
    ModifyIndex: number;
}
export interface ConsulServiceResponse {
    ID: string;
    Service: string;
    Address: string;
    Port: number;
    Weights: any;
    EnableTagOverride: boolean;
    ProxyDestination?: string;
    Proxy?: any;
    Connect?: any;
    Tags?: Array<any>;
    TaggedAddresses?: TaggedAddresses
    Meta?: any;
    CreateIndex: number;
    ModifyIndex: number;
}

export interface Instance {
    address: string;
    executed: boolean;
    id: string;
    name: string;
    port: number;
    status: string;
}

export interface TaggedAddresses {

}

export interface ServiceInstance {
    id: string;
    serviceId: string;
    serviceName: string;
    checkIndex: number;
    port: number;
    host: string;

}
