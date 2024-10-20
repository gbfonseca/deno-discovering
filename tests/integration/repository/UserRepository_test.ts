import { assertEquals, assertGreaterOrEqual } from "@std/assert";
import {
  describe,
  it,
  beforeAll,
  afterAll,
  beforeEach,
} from "@std/testing/bdd";
import UserRepository from "../../../src/modules/user/repository/UserRepository.ts";
import DBClient from "../../../src/infra/db/DBClient.ts";
import { Helper } from "../../Helper.ts";

describe("User Repository Tests", () => {
  const dbClient = new DBClient();
  const repository = new UserRepository(dbClient);

  beforeAll(async () => {
    await dbClient.connectDatabase();
  });

  beforeEach(async () => {
    await Helper.clearDatabase();
  });

  afterAll(async () => {
    await dbClient.closeDatabase();
  });

  it("should create user", async () => {
    const result = await repository.create({ name: "John Doe" });
    assertEquals(result.name, "John Doe");
  });

  it("should return all users", async () => {
    await repository.create({ name: "John Doe" });
    const result = await repository.find({});
    assertGreaterOrEqual(result.length, 1);
  });
});
