import { ConsulConfigClient } from "./consul-config-client";

describe("This is a simple test", () => {
  const consulConfigClient = new ConsulConfigClient();
  test("When Bootstrap File exists, we can configure consul", () => {
    const bootstrapObj = consulConfigClient.readBootstrapFile();
    expect(bootstrapObj).toBeDefined();

    expect(bootstrapObj.application).toBeDefined();
    expect(bootstrapObj.application.name).toBe("apricot");

    expect(bootstrapObj.consul).toBeDefined();
    expect(bootstrapObj.consul.host).toBeDefined();
    expect(bootstrapObj.consul.host).toBe("vagrant-hashi-stack-1.alpha.consul");
    expect(bootstrapObj.consul.port).toBe(8501);
  });


  test("When we request config from consul, we can find it for the application", async () => {
      const resultConfig = await consulConfigClient.getConfig("default");
      expect(resultConfig).toBeDefined();
      console.log(resultConfig);
  });
});
