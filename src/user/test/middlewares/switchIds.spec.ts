import { NextFunction, Request, Response } from "express";
import { switchIds } from "../../main/middlewares";

describe('User Domain - Middlewares - switchIds', () => {
    let mockRequest: Partial<Request>;
    let mockResponse: Partial<Response>;
    let nextFunction: NextFunction = jest.fn();

    beforeEach(() => {
        mockRequest = {};
        mockResponse = {
            json: jest.fn()
        };
    });

    test('switchIds should switch uid and userUpdatedId', () => {
        mockRequest = {
            body: {
                uid: "user_id",
                userUpdatedId: "userUpdatedId"
            }
        }

        switchIds(mockRequest as Request, mockResponse as Response, nextFunction);

        expect(nextFunction).toHaveBeenCalledTimes(1);
        expect(mockRequest.body.uid).toBe("userUpdatedId");
    });
});