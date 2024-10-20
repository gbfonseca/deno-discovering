import {
  Document,
  MongoClient,
} from "https://deno.land/x/mongo@v0.33.0/mod.ts";
export default class DBClient {
  client = new MongoClient();

  async connectDatabase() {
    await this.client.connect("mongo://localhost:27017/teste");
  }

  async closeDatabase() {
    await this.client.close();
  }

  async create<T = unknown>(collection: string, data: Document): Promise<T> {
    return await this.client
      .database()
      .collection(collection)
      .insertOne({
        ...data,
      });
  }

  async find<T = unknown>(
    collection: string,
    filter: Partial<T>
  ): Promise<T[]> {
    return (await this.client
      .database()
      .collection(collection)
      .find(filter)
      .toArray()) as T[];
  }
}
