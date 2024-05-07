import { generateToken } from "../utils/jwtUtils";
import { ROLE } from "../constants";
import { AccountModel } from "../models";
import { RequestHandler } from "../utils";
import "../utils/passport";

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
        }
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
        await newAccount.save();
        createdAccount = newAccount;
      }

      const token = generateToken({
        id: createdAccount.id,
        role: createdAccount.role,
      })

      res.status(200).json({
        token
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
    console.log(req.body);
    res.send("ok");
  }

}

export default new AuthController();
