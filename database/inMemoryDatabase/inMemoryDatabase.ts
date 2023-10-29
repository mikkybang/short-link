import { Database } from "../database";

export class InMemoryDatabase extends Database {
  data: Record<string, any>;
  constructor() {
    super();
    this.data = {};
  }

  connect() {
    console.log("Connected to in-memory database");
    return;
  }

  disconnect() {
    console.log("Disconnected from in-memory database");
    return;
  }

  set(key: string, value: Record<string, any>): Promise<Record<string, any>> {
    this.data[key] = value;
    return Promise.resolve(value);
  }

  get(key: string) {
    return this.data[key];
  }

  delete(key: string): Promise<void> {
    delete this.data[key];
    return Promise.resolve();
  }

  update(
    key: string,
    value: Record<string, any>
  ): Promise<Record<string, any>> {
    if (!this.data[key]) {
      throw new Error("Key not found");
    }
    const existingData = this.data[key];
    this.data[key] = {
      ...existingData,
      ...value,
    };
    return Promise.resolve(this.data[key]);
  }
}