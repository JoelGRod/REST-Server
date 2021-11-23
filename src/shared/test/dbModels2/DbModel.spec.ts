// Test
import { DbModel } from "../../main/dbModels2";
// Db Test
import { dbClientTests, dbTestsConnection } from "./dbConnections";

describe("Shared Domain - dbModels - UserDb", () => {
  const collection = "users";
  let dbModel: DbModel;

  beforeAll(async () => {
    try {
      await dbTestsConnection();
      dbModel = new DbModel(dbClientTests, collection);
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

  test("findById with a valid ID should return a document from db", async () => {
    // arrange
    const uid = "618fc61c198f16d3b1a21157";  
    // act
    const user = await dbModel.findById(uid);
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(user).toBeTruthy();
  });

  test("findById with an invalid ID should return null from db", async () => {
    // arrange
    const uid = "618fc61c198f16d3b1a21158";
    // act
    const user = await dbModel.findById(uid);
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(user).toBeFalsy();
  });

  test("findById with an invalid ObjectID should return an error", async () => {
    // arrange
    const uid = "abc";
    // act & assert
    await expect(dbModel.findById(uid))
        .rejects.toThrowError();
  });

  test("save should create a new user", async () => {
    // arrange
    const newUser = {
      name: "Test from Tests",
      email: "TestMongo@mail.com",
      password: "abc",
      role: "USER_ROLE",
    };
    dbModel.saveDocument = jest.fn();
    // act
    await dbModel.saveDocument(newUser);
    // assert
    expect(dbModel.saveDocument)
        .toHaveBeenCalledWith(newUser);
  });

  test("findByIdAndUpdate should update doc by id and return updated doc", async () => {
    // arrange
    const uid = "618fc61c198f16d3b1a21157";
    const updatedData = {
      status: false
    };
    // act
    const updatedUser = await dbModel
        .findByIdAndUpdate(uid, updatedData);
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(updatedUser).toBeTruthy();
  });

  test("findByIdAndUpdate should return null with wrong ID", async () => {
    // arrange
    const uid = "618fc61c198f16d3b1a21158";
    const updatedData = {
      status: false
    };
    // act
    const updatedUser = await dbModel
        .findByIdAndUpdate(uid, updatedData);
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(updatedUser).toBeFalsy();
  });

  test("findByIdAndUpdate with an invalid ObjectID should return an error", async () => {
    // arrange
    const uid = "abc";
    const updatedData = {
      status: false
    };
    // act & assert
    await expect(dbModel.findByIdAndUpdate(uid, updatedData))
        .rejects.toThrowError();
  });

  test("findOne should return a Document if strict data is ok", async () => {
    // arrange
    const email = "test@email.com";
    const role = "ADMIN_ROLE";
    // act
    const user = await dbModel
        .findOne({email, role});
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(user).toBeTruthy();
  });

  test("findOne should return null if strict data is wrong", async () => {
    // arrange
    const email = "no-email@email.com";
    const role = "ADMIN_ROLE";
    // act
    const user = await dbModel
        .findOne({email, role});
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(user).toBeFalsy();
  });

  test("count should return the number of documents in a collection if data match", async () => {
    // arrange
    const email = "test@email.com";
    const role = "ADMIN_ROLE";
    // act
    const counts = await dbModel
        .count({ role, email });
    // assert
    expect(dbModel).toBeInstanceOf(DbModel);
    expect(counts).toBe(1);
  });
});