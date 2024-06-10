import axios from "axios";
import { IHandleGoggleLoginAsyncRequest, IHandleGoggleLoginAsyncResponse, IResponse } from "../interfaces";
import { AccountModel, BalanceModel } from "../models";
import utils from "../utils";
import { ROLE } from "../constants";
import { generateToken } from "../utils/jwtUtils";
import BaseBusiness from "./BaseBusiness";

class AuthBusiness {
    /*
    async GoogleCallback(req, res) {
        try {
            if (!req.user) {
                res.status(400).json({ error: "Authentication failed" });
                return;
            }

            const user = {
                providerId: req.user.id,
                familyName: req.user.name.familyName,
                givenName: req.user.name.givenName,
                email: req.user.emails[0].value,
                photo: req.user.photos[0].value,
                provider: req.user.provider,
            };

            let createdAccount;

            const accountInDatabase = await AccountModel.findOne({
                where: {
                    idAtProvider: user.providerId,
                    providerName: user.provider,
                },
            });
            createdAccount = accountInDatabase;

            if (!accountInDatabase) {
                const newAccount = await AccountModel.create({
                    idAtProvider: user.providerId,
                    familyName: user.familyName,
                    givenName: user.givenName,
                    email: user.email,
                    isVerifyEmail: true,
                    photo: user.photo,
                    providerName: user.provider,
                    role: ROLE.MEMBER,
                });
                await BalanceModel.create({
                    accountId: newAccount.id,
                    amount: 0,
                });
                createdAccount = newAccount;
            }

            const token = generateToken({
                id: createdAccount.id,
                role: createdAccount.role,
            });

            res.status(200).json({
                token,
            });
        } catch (ex) {
            RequestHandler.sendError(res);
        }
    }

    async FacebookCallback(req, res) {
        try {
            if (!req.user) {
                res.status(400).json({ error: "Authentication failed" });
            }
            res.status(200).json(req.user);
        } catch (ex) {
            RequestHandler.sendError(res);
        }
    }
        */

    HandleGoggleLoginAsync = async (reqObj: IHandleGoggleLoginAsyncRequest): Promise<IResponse<IHandleGoggleLoginAsyncResponse>> => {

        console.log(reqObj)

        try {
            const response = await axios.get(
                `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${reqObj.access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${reqObj.access_token}`,
                        Accept: "application/json",
                    },
                }
            );

            const userInfo = response.data;
            let createdAccount;

            const accountInDatabase = await AccountModel.findOne({
                where: {
                    idAtProvider: userInfo.id,
                    providerName: "google",
                },
            });
            createdAccount = accountInDatabase;

            if (!accountInDatabase) {

                const newAccount = await AccountModel.create({
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
                    accountId: newAccount.id,
                    amount: 0,
                });
                createdAccount = newAccount;
            }

            const token = generateToken({
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
        } catch (err) {
            return BaseBusiness.Error;
        }
    }
}

export default AuthBusiness;