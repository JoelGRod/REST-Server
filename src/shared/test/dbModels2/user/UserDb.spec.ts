// Test
import { UserDb } from "../../../main/dbModels2";
// Db Test
import {
  dbClientTests,
  dbTestsConnection,
} from "../dbConnections";

describe("Name of the group", () => {
  beforeAll(async () => {
    try {
      await dbTestsConnection();
    } catch (error) {
      console.log(error);
    }
  });
  afterAll(async () => {
    try {
      await dbClientTests.close();
    } catch (error) {
      console.log(error);
    }
  });

  test("findById should return a user from db", async () => {
      // arrange
    const uid = "618fc61c198f16d3b1a21157";
    // act
    const userDb = await UserDb.findById(uid, dbClientTests);
    // assert
    expect(userDb).toBeInstanceOf(UserDb.UserModel);
  });
});
