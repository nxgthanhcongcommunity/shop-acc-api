import { checkSchema } from "express-validator";

class AuthValidator {
  GetAccountByCodeAsync = checkSchema({
    accountCode: {
      notEmpty: {
        errorMessage: "accountCode can not be null!!",
      },
    },
  });
  HandleGoggleLoginAsync = checkSchema({
    accessToken: {
      notEmpty: {
        errorMessage: "accessToken can not be null!!",
      },
    },
  });
  LoginAsync = checkSchema({});
  RefreshTokenAsync = checkSchema({
    refreshToken: {
      notEmpty: {
        errorMessage: "refreshToken can not be null!!",
      },
    },
  });
}

export default AuthValidator;
