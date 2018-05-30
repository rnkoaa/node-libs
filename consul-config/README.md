# Consul Config Client Example

1. Create a `config/` directory in the root project
2. Add a `bootstrap.json` file in the `config/` directory with the following sample contents

    ```json
    {
      "application": {
        "name": "apricot"
      },
      "consul": {
        "host": "vagrant-hashi-stack-1.alpha.consul",
        "port": 8501,
        "secure": false
      }
    }
    ```

    Ensure that the `host, port, secure` and other properties are correct.
    also ensure that the `application.name` key is correct since we retrieve the config based on `config/${application.name}/${NODE_ENV}`. If the `NODE_ENV` is not supplied at the start of the application, the env is defaulted to `default`.

3. Finally, Import the `ConfigBootstrap`. call the bootstrap function and the config is ready to be used.

Below is an example usage.

```js
import { ConfigBootstrap } from "./index";

const configBootstrap = new ConfigBootstrap();

async function bootstrap() {
  await configBootstrap.bootstrap("default");
  console.log(configBootstrap.get("port"));
  console.log(configBootstrap.get("app_name"));
  console.log(configBootstrap.get("app_maintainer"));
}

bootstrap();
```
