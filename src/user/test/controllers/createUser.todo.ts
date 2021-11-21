import { Request, Response } from "express";
// Models

// Controller
import { createUser } from "../../main/controllers/createUser";

describe("User Domain - controllers - createUser", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let UserDbMock = function ({ ...args }) {
    return { ...args };
  };

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  //   jest.mock("../../../shared/main/dbModels/user/User", () => {
  //     return function ({ ...args }) {
  //       return {
  //         ...args,
  //       };
  //     };
  //   });

  jest.mock("../../../shared/main/dbModels/user/User", () => UserDbMock);

  UserDbMock.prototype.save = function () {
    return;
  };

  test("createUser should return an ok response with userDb", async () => {
    mockRequest = {
      body: {
        name: "test",
        email: "test@email.com",
        password: "123456",
      },
    };

    const expectResponse = {
      ok: true,
      userDb: {
        name: "test",
        email: "test@email.com",
        password: "123456",
        role: "USER_ROLE",
      },
    };

    await createUser(mockRequest as Request, mockResponse as Response);

    expect(mockResponse.json).toHaveBeenCalled();
    expect(mockResponse.json).toHaveBeenCalledWith(expectResponse);
    // expect(mockResponse.status).toHaveBeenCalledTimes(1);
    // expect(mockRequest.body.password).not.toBe("123456");
  });
});
