import Consul from "consul";
import path from "path";
import fs from "fs";
import nconf from "nconf";

const CONFIG_DIR = path.join(process.cwd(), "config");

export class ConsulConfigClient {
  private _consulClient;

  getConfig(environment: string): Promise<string> {
    if (!environment) {
      environment = "default";
    }
    const bootstrapConfigObj = this.readBootstrapFile();
    let applicationName = undefined;
    return new Promise<any>((resolve, reject) => {
      if (bootstrapConfigObj) {
        if (bootstrapConfigObj.consul) {
          this._consulClient = ConsulConfigClient.consulClient(bootstrapConfigObj.consul);
        } else {
          reject("Could Not Find Consul Host to make request");
        }

        if (bootstrapConfigObj.application) {
          applicationName = this._getApplicationName(bootstrapConfigObj.application);
        } else {
          reject("Application Name is required to make request");
        }
        if (applicationName) {
          this._consulClient.kv.get(`config/${applicationName}/${environment}`, (err, result: any) => {
            if (err) {
              reject(err);
            } else {
              const configString = result.Value;
              const configObj = JSON.parse(configString);
              resolve(configString);
            }
          });
        }
      }
    });
  }

  private _getApplicationName(application: any): string {
    if (application) {
      return application.name;
    }
    return undefined;
  }

  static consulClient(consulOpts) {
    return new Consul(consulOpts);
  }

  readBootstrapFile(): any {
    const bootstrapFile = path.join(CONFIG_DIR, "bootstrap.json");
    if (fs.existsSync(bootstrapFile)) {
      const bootstrapConfigObj = fs.readFileSync(bootstrapFile, "utf-8");
      return JSON.parse(bootstrapConfigObj);
    }
    return undefined;
  }
}

export class ConfigBootstrap {
  private _consulConfigClient = new ConsulConfigClient();

  async bootstrap(ENVIRONMENT) {
    if (this._isBootstrapped()) {
      const consulAppConfig = await this._consulConfigClient.getConfig(ENVIRONMENT);
      const appConfigObj = JSON.parse(consulAppConfig);
      nconf.defaults(appConfigObj);
    }
  }

  get(key: string): string {
    return nconf.get(key);
  }

  registerShutdown(ENVIRONMENT) {
    if (this._isBootstrapped()) {
      const configFile = path.join(CONFIG_DIR, `${ENVIRONMENT}.json`);
      if (fs.existsSync(configFile)) {
        fs.unlinkSync(configFile);
      }
    }
  }

  private _isBootstrapped(): boolean {
    const bootstrapConfigFile = path.join(__dirname, "../config/bootstrap.json");
    if (fs.existsSync(bootstrapConfigFile)) {
      const bootstrapConfigString = fs.readFileSync(bootstrapConfigFile, "utf-8");
      const bootstrapConfigObj = JSON.parse(bootstrapConfigString);
      return (
        bootstrapConfigObj != undefined &&
        bootstrapConfigObj.consul != undefined &&
        bootstrapConfigObj.consul.enabled
      );
    }
    return false;
  }
}
