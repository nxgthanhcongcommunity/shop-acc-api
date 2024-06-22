import { IGetUserInfoFromGoogleReq } from "repositories/AuthRepository";
import { ROLES } from "../constants";
import { IHandleGoggleLoginAsyncResponse, IResponse } from "../interfaces";
import { BalanceModel } from "../models";
import { AccountRepository, AuthRepository } from "../repositories";
import utils, { jwtUtils, logUtils, validateUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

class AuthBusiness {
  _authRepository = new AuthRepository();
  _accountRepository = new AccountRepository();

  HandleGoggleLoginAsync = async (
    req
  ): Promise<IResponse<IHandleGoggleLoginAsyncResponse>> => {
    try {
      const reqModel: IGetUserInfoFromGoogleReq = req.body;
      if (validateUtils.isEmpty[reqModel.access_token]) {
        return BaseBusiness.ClientError("access_token is required!!");
      }

      const googleResponse = await this._authRepository.GetUserInfoFromGoogle(
        reqModel
      );
      const userInfo = googleResponse.data;

      let createdAccount = await this._accountRepository.GetAccountAtProvider({
        idAtProvider: userInfo.id,
        providerName: "google",
      });

      if (createdAccount == null) {
        createdAccount = await this._accountRepository.CreateAccount({
          code: `USR-${utils.generateUniqueString(6)}`,
          idAtProvider: userInfo.id,
          familyName: userInfo.family_name,
          givenName: userInfo.given_name,
          email: userInfo.email,
          isVerifyEmail: userInfo.verified_email,
          photo: userInfo.picture,
          providerName: "google",
          role: ROLES.MEMBER,
          passwordHash: "",
        });
        await BalanceModel.create({
          accountId: createdAccount.id,
          amount: 0,
        });
      }

      const payload = {
        accountCode: createdAccount.code,
        roles: [ROLES.MEMBER],
      };

      const token = jwtUtils.generateToken(payload);
      const refreshToken = jwtUtils.generateRefreshToken({
        accountCode: createdAccount.code,
      });

      return BaseBusiness.Success({
        token,
        refreshToken,
      });
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  RefreshTokenAsync = async (req) => {
    try {
      const { refreshToken } = req.body;
      if (!refreshToken)
        return BaseBusiness.ClientError("RefreshToken không được để trống!!");

      const decoded = jwtUtils.verifyRefreshToken(refreshToken);
      if (decoded == null)
        return BaseBusiness.ClientError("RefreshToken không hợp lệ!!");

      const account = await this._accountRepository.GetAccountByCodeAsync(
        decoded.accountCode
      );
      if (account == null)
        return BaseBusiness.ClientError("Tài khoản không tồn tại!!");

      const payload = {
        accountCode: account.code,
        roles: [ROLES.MEMBER],
      };
      return BaseBusiness.Success({
        token: jwtUtils.generateToken(payload),
        refreshToken: jwtUtils.generateRefreshToken({
          accountCode: account.code,
        }),
      });
    } catch (ex) {
      logUtils.logError(ex);
      return BaseBusiness.Error();
    }
  };

  LoginAsync = async (req) => {
    const account = await this._accountRepository.GetAccountByCodeAsync(
      "USR-QDGVLE"
    );
    const payload = {
      accountCode: account.code,
      roles: [ROLES.MEMBER],
    };

    const token = jwtUtils.generateToken(payload);
    const refreshToken = jwtUtils.generateRefreshToken({
      accountCode: account.code,
    });

    return BaseBusiness.Success({
      token,
      refreshToken,
    });
  };
}

export default AuthBusiness;
