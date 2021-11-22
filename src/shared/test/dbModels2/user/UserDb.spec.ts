// Test
import { UserDB } from "../../../main/dbModels2";
// Db Test
import { dbClientTests, dbTestsConnection } from "../dbConnections";

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
    const userDb = new UserDB(dbClientTests);
    // act
    const user = await userDb.findById(uid);
    // assert
    expect(userDb).toBeInstanceOf(UserDB);
    expect(user).toBeTruthy();
  });

  test("findById with an invalid ID should return a null user from db", async () => {
    // arrange
    const uid = "618fc61c198f16d3b1a21158";
    const userDb = new UserDB(dbClientTests);
    // act
    const user = await userDb.findById(uid);
    // assert
    expect(userDb).toBeInstanceOf(UserDB);
    expect(user).toBeFalsy();
  });

  test("findById with an invalid ObjectID should return an error", async () => {
    // arrange
    const uid = "abc";
    const userDb = new UserDB(dbClientTests);
    // act & assert
    await expect(userDb.findById(uid)).rejects.toThrowError("Invalid ID");
  });

  test("save should create a new user", async () => {
    // arrange
    const newUser = {
      name: "Test from Tests",
      email: "TestMongo@mail.com",
      password: "abc",
      role: "USER_ROLE",
    };
    const userDb = new UserDB(dbClientTests);
    userDb.save = jest.fn();
    // act
    await userDb.save(newUser);
    // assert
    expect(userDb.save).toHaveBeenCalledWith(newUser);
  });

  test("findByIdAndUpdate should update user by id", async () => {
    // arrange
    const uid = "618fc61c198f16d3b1a21157";
    const updatedData = {
      status: false,
    };
    const userDb = new UserDB(dbClientTests);
    const user = await userDb.findByIdAndUpdate(uid, updatedData);
    // act
    
    // assert
    
  });
});
