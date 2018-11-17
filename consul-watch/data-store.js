"use strict";


Object.defineProperty(exports, "__esModule", { value: true });
class DataStore {
    constructor() {
        this._instances = [];
        this._applicationId = '';
    }
    get instances() {
        return this._instances;
    }
    set instances(_instances) {
        this._instances = _instances;
    }
    set applicationId(_applicationId) {
        this._applicationId = _applicationId;
    }
    get applicationId() {
        return this._applicationId;
    }
    clear() {
        this._instances = [];
    }
    get size() {
        this._instances.length;
    }
    addInstance(instance) {
        if (!instance.instanceId) {
            throw new Error('instance service Id is required.');
        }
        // remove an instance with the same instanceId if it exists
        // if it does not exist, nothing will happen.
        this.removeIfExists(instance.instanceId);
        // then add the new instance to the list
        this._instances.push(instance);
    }
    addInstances(instances) {
        instances.forEach(instance => this.addInstance(instance));
    }
    removeById(id) {
        const idx = this._instances.findIndex(item => item.id === id);
        if (idx > -1) {
            this.instances.splice(idx, 1);
        }
    }
    remove(instanceId) {
        const idx = this._instances.findIndex(item => item.instanceId === instanceId);
        if (idx > -1) {
            this.instances.splice(idx, 1);
        }
    }
    // overloaded method to indicate that nothing happens if it does not exist.
    removeIfExists(instanceId) {
        this.remove(instanceId);
    }
    findById(id) {
        const idx = this._instances.findIndex(item => item.id === id);
        if (idx > -1) {
            return this._instances[idx];
        }
        return {};
    }
    findInstancesByName(name) {
        return this._instances.filter(item => item.serviceName === name);
    }
    findInstancesByinstanceId(instanceId) {
        return this._instances.filter(instance => instance.instanceId === instanceId);
    }
}
exports.DataStore = DataStore;
