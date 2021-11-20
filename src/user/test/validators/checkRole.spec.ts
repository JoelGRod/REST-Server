// Models
import { RoleDb } from "../../../shared/main/dbModels";
// Test focus
import { checkDbRole, checkAdminRole } from "../../main/validators/checkRole";
// Data
import { requestObject } from "../mock-data/requestObject";

describe("User Domain - Validators - checkRole", () => {
  test("checkDbRole should return true if role is valid", async () => {
    // arrange
    RoleDb.findOne = jest.fn().mockReturnValueOnce("ADMIN_ROLE");
    const role: string = "ADMIN_ROLE";
    // act
    const result = await checkDbRole(role);
    // assert
    expect(result).toBe(true);
    expect(RoleDb.findOne).toHaveBeenCalledWith({ role: "ADMIN_ROLE" });
  });

  test("checkDbRole should throw Error if role is invalid", async () => {
    // arrange
    RoleDb.findOne = jest.fn();
    const role: string = "NO_ROLE";
    // act & assert
    await expect(checkDbRole(role)).rejects.toThrowError("Invalid Role");
    expect(RoleDb.findOne).toHaveBeenCalledWith({ role: "NO_ROLE" });
  });

  test("checkAdminRole should return true if logged user role is ADMIN_ROLE", () => {
    // arrange
    const role: string = "NO_ROLE";
    // act
    const result = checkAdminRole(role, requestObject);
    // assert
    expect(result).toBe(true);
  });

  test("checkAdminRole should throw error if logged user role is not ADMIN_ROLE", () => {
    // arrange
    const role: string = "NO_ROLE";
    requestObject.req.body.loggedUser.role = "USER_ROLE";
    // act & assert
    expect(() => {
        checkAdminRole(role, requestObject)
    }).toThrowError("You need to be ADMIN to execute this action");
  });
});
