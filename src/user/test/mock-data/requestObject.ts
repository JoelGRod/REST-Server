import { encrypt } from "../../../shared/main/helpers/crypt";

export const requestObject = {
    req: {
        body: {
          loggedUser: {
            password: encrypt("123456"),
            role: "ADMIN_ROLE"
          },
          repeatPwd: "123456",
        }
    }
};