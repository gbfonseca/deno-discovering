import type DBClient from "../../../infra/db/DBClient.ts";
import { randomUUID } from "node:crypto";

export default class Repository<T> {
  protected collectionName: string = "";
  constructor(private readonly dbClient: DBClient) {}

  async create(data: T) {
    const toSave = {
      ...data,
      id: randomUUID(),
    };
    await this.dbClient.create(this.collectionName, toSave);

    return toSave;
  }

  async find(filter: Partial<T>): Promise<T[]> {
    return await this.dbClient.find(this.collectionName, filter);
  }
}
