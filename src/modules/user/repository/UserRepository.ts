import Repository from "../../common/models/Repository.ts";
import type { User } from "../models/User.ts";

export default class UserRepository extends Repository<User> {
  protected override collectionName: string = "user";
}
