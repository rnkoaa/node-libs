// export const Greeter = (name: string) => `Hello ${name}`;
import { InstanceOperations } from './instance-operations';

const instanceOperations = new InstanceOperations();
// const response = instanceOperations.registerService({
//   name: 'apricot',
//   hostAddress: 'localhost',
//   port: 8081,
// });

// console.log(`Registered response: ${response}`);

const deregisterResponse = instanceOperations.deregisterService({
    serviceId: "1"
})

deregisterResponse.then(res => {
    console.log(`Got response for deregister: ${res}`)
})
.catch(err => {
    console.log(`Got response for deregister error : ${err}`)
})
