import { AccountRepository, AuthRepository } from "../repositories";
import BaseController from "./BaseController";
import utils, { jwtUtils } from "../utils";
import { ROLES } from "../constants";
import { BalanceModel } from "../models";

class AuthController extends BaseController {
  _authRepository = new AuthRepository();
  _accountRepository = new AccountRepository();

  HandleGoggleLoginAsync = async (req, res) => {
    try {
      const { accessToken } = req.body;

      const googleResponse = await this._authRepository.GetUserInfoFromGoogle(
        accessToken
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

      const roles =
        createdAccount.email == "nxgthanhcongcommunity@gmail.com"
          ? [ROLES.ADMIN, ROLES.MEMBER]
          : [ROLES.MEMBER];

      const payload = {
        accountCode: createdAccount.code,
        roles,
      };

      const token = jwtUtils.generateToken(payload);
      const refreshToken = jwtUtils.generateRefreshToken({
        accountCode: createdAccount.code,
      });

      return res.json({
        succeed: true,
        data: {
          token,
          refreshToken,
        },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  RefreshTokenAsync = async (req, res) => {
    try {
      const { refreshToken } = req.body;

      const decoded = jwtUtils.verifyRefreshToken(refreshToken);
      if (decoded == null)
        return res.json({
          succeed: false,
          message: "server error",
        });

      const account = await this._accountRepository.GetAccountByCodeAsync(
        decoded.accountCode
      );
      if (account == null)
        return res.json({
          succeed: false,
          message: "server error",
        });

      const payload = {
        accountCode: account.code,
        roles: [ROLES.MEMBER],
      };

      return res.json({
        succeed: true,
        data: {
          token: jwtUtils.generateToken(payload),
          refreshToken: jwtUtils.generateRefreshToken({
            accountCode: account.code,
          }),
        },
      });
    } catch (ex) {
      return res.json({
        succeed: false,
        message: "server error",
      });
    }
  };

  LoginAsync = async (req, res) => {
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

    return res.json({
      succeed: true,
      data: {
        token,
        refreshToken,
      },
    });
  };
}

export default new AuthController();
