
// export const hello = () => {
//     console.log('hello, world!');
// }

// hello();
import { Catalog } from '@creditkarma/consul-client'
import { IServiceMap } from '@creditkarma/consul-client/dist/main/catalog/types';

const catalog: Catalog = new Catalog([ 'http://localhost:8500' ])

// List all services registered with Consul
catalog.listServices().then((res: IServiceMap) => {
    // Do something
    console.log(res);
});


