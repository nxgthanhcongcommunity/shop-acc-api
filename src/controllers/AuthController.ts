import axios from "axios";
import { ROLE } from "../constants";
import { AccountModel, BalanceModel } from "../models";
import utils, { RequestHandler } from "../utils";
import { generateToken } from "../utils/jwtUtils";
import "../utils/passport";

const { GOOGLE_CLIENT_ID } = process.env;
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const requestHandler = new RequestHandler();

class AuthController {
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
      requestHandler.sendError(res);
    }
  }

  async FacebookCallback(req, res) {
    try {
      if (!req.user) {
        res.status(400).json({ error: "Authentication failed" });
      }
      res.status(200).json(req.user);
    } catch (ex) {
      requestHandler.sendError(res);
    }
  }

  async HandleGoggleLoginAsync(req, res) {
    const credential = req.body;

    try {
      const response = await axios.get(
        `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${credential.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${credential.access_token}`,
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

      requestHandler.sendSucceed(res, {
        token,
        refreshToken: "",
      });

      // requestHandler.sendError(res);
    } catch (ex) {
      console.log(ex);
      requestHandler.sendError(res);
    }
  }
}

export default new AuthController();
