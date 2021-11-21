// Test
import { UserDb } from "../../../main/dbModels2";
// Db Test
import {
  dbClientTests,
  dbTestsConnection,
} from "../dbConnections";

describe("Shared Domain - dbModels - UserDb", () => {
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

  test("findById with a valid ID should return a user from db", async () => {
      // arrange
    const uid = "618fc61c198f16d3b1a21157";
    // act
    const userDb = await UserDb.findById(uid, dbClientTests);
    // assert
    expect(userDb).toBeInstanceOf(UserDb.UserModel);
    expect(userDb.uid).toBeTruthy();
  });

  test("findById with an invalid ID should return a null user from db", async () => {
      // arrange
    const uid = "618fc61c198f16d3b1a21158";
    // act
    const userDb = await UserDb.findById(uid, dbClientTests);
    // assert
    expect(userDb).toBeInstanceOf(UserDb.UserModel);
    expect(userDb.uid).toBeFalsy();
  });

  test("findById with an invalid ObjectID should return an error", async () => {
      // arrange
    const uid = "abc";
    // act & assert
    await expect(UserDb.findById(uid, dbClientTests))
      .rejects
      .toThrowError("Invalid ID");
  });
});
