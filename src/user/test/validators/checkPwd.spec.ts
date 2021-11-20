// Test focus
import { equalPasswords, checkDbPwd } from "../../main/validators/checkPwd";
// Data
import { requestObject } from "../mock-data/requestObject"

describe("User Domain - Validators - checkPwd", () => {
  test("equalPasswords should return true if passwords (pwd and repeatPwd) are equals", () => {
    // arrange
    const password: string = "123456";
    // act
    const result = equalPasswords(password, requestObject);
    // assert
    expect(result).toBe(true);
  });

  test("equalPasswords should throw error if passwords (pwd and repeatPwd) are not equals", () => {
    // arrange
    const password: string = "1234567";
    // act & assert
    expect(() => {
        equalPasswords(password, requestObject)
    }).toThrowError("Passwords not Equals");
  });

  test("checkDbPwd should return true if passwords (db and supplied) are equals", async () => {
    // arrange
    const password: string = "123456";
    // act
    const result = await checkDbPwd(password, requestObject);
    // assert
    expect(result).toBe(true);
  });

  test("checkDbPwd should throw error if passwords (db and supplied) are not equals", async () => {
    // arrange
    const password: string = "1234567";
    // act & assert
    await expect(checkDbPwd(password, requestObject))
        .rejects.toThrowError("Passwords doesn`t match");
  });
});
