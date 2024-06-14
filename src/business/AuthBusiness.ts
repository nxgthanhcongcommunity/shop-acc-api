import { IGetUserInfoFromGoogleReq } from "repositories/AuthRepository";
import { ROLE } from "../constants";
import { IHandleGoggleLoginAsyncResponse, IResponse } from "../interfaces";
import { BalanceModel } from "../models";
import { AccountRepository, AuthRepository } from "../repositories";
import utils, { jwtUtils, logUtils, validateUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

class AuthBusiness {

    _authRepository = new AuthRepository();
    _accountRepository = new AccountRepository();

    HandleGoggleLoginAsync = async (req): Promise<IResponse<IHandleGoggleLoginAsyncResponse>> => {


        try {
            const reqModel: IGetUserInfoFromGoogleReq = req.body;
            if (validateUtils.isEmpty[reqModel.access_token]) {
                return BaseBusiness.ClientError("access_token is required!!");
            }

            const googleResponse = await this._authRepository.GetUserInfoFromGoogle(reqModel);
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
                    role: ROLE.MEMBER,
                    passwordHash: "",
                });
                await BalanceModel.create({
                    accountId: createdAccount.id,
                    amount: 0,
                });
            }

            const token = jwtUtils.generateToken({
                id: createdAccount.id,
                code: createdAccount.code,
                familyName: createdAccount.familyName,
                givenName: createdAccount.givenName,
                email: createdAccount.email,
                photo: createdAccount.photo,
            });

            return BaseBusiness.Success({
                token,
                refreshToken: "",
            })
        } catch (ex) {
            logUtils.logError(ex);
            return BaseBusiness.Error();
        }
    }
}

export default AuthBusiness;