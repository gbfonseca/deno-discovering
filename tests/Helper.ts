import DBClient from "../src/infra/db/DBClient.ts";

export class Helper {
  static async clearDatabase() {
    const dbClient = new DBClient();
    await dbClient.connectDatabase();
    const collections = await dbClient.client
      .database()
      .listCollections()
      .toArray();

    for (const collection of collections) {
      await dbClient.client.database().collection(collection.name).drop();
    }
    await dbClient.closeDatabase();
  }
}
