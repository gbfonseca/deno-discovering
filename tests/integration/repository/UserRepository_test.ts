import { assertEquals, assertGreaterOrEqual } from "@std/assert";
import UserRepository from "../../../src/modules/user/repository/UserRepository.ts";
import DBClient from "../../../src/infra/db/DBClient.ts";

const dbClient = new DBClient();
const repository = new UserRepository(dbClient);

Deno.test("should create user", async () => {
  await dbClient.connectDatabase();

  const result = await repository.create({ name: "John Doe" });
  assertEquals(result.name, "John Doe");

  await dbClient.closeDatabase();
});

Deno.test("should return all users", async () => {
  await dbClient.connectDatabase();

  const result = await repository.find({});
  assertGreaterOrEqual(result.length, 1);

  await dbClient.closeDatabase();
});
