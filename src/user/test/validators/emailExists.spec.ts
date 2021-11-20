// Model
import { UserDb } from "../../../shared/main/dbModels";
import { emailExists } from "../../main/validators";

describe("User Domain - Validators - emailExists", () => {
    test('emailExists should return true if email not exists', async () => {
        // arrange
        UserDb.findOne = jest.fn();
        const email = "email@email.com";
        // act
        const result = await emailExists(email);
        // assert
        expect(result).toBe(true);
        expect(UserDb.findOne).toHaveBeenCalledWith({email});
    });

    test('emailExists should throw Error if email exists', async () => {
        // arrange
        UserDb.findOne = jest.fn().mockReturnValueOnce({email: "email@email.com"});
        const email = "email@email.com";
        // act & assert
        await expect(emailExists(email)).rejects.toThrowError("Email Exists");
        expect(UserDb.findOne).toHaveBeenCalledWith({email});
    });
});