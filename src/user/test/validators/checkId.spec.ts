import { checkId } from "../../main/validators";
import { UserDb } from "../../../shared/main/dbModels";

describe("Domain User - Validators - checkId", () => {
    // State
    // Tests
    test("Returns true if userDb Exists and status is true", async () => {
        // arrange
        const uid = "618fc61c198f16d3b1a21157";
        UserDb.findById = jest.fn().mockReturnValueOnce({status: true});
        // act
        const userDb = await checkId(uid);
        // assert
        expect(userDb).toBe(true);
        expect(UserDb.findById).toHaveBeenCalledWith(uid);
    })
    
    test("Returns Error if userDb not Exists", async () => {
        // arrange
        const uid = "";
        UserDb.findById = jest.fn().mockReturnValueOnce({});
        // act
        // Assert
        await expect(checkId(uid))
            .rejects
            .toThrow("The provided id does not exist");
        expect(UserDb.findById).toHaveBeenCalledWith(uid);
    })
});

