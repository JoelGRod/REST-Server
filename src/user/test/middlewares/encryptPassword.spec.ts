import { NextFunction, Request, Response } from "express";
import { encryptPassword } from "../../main/middlewares";

describe('Name of the group', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    test('encryptPassword should encrypt password and store it in req body', () => {
        mockRequest = {
            body: {
                password: "123456"
            }
        }

        encryptPassword(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toHaveBeenCalledTimes(1);
        expect(mockRequest.body.password).not.toBe("123456");
    });
});