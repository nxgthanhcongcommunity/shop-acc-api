import passport from "passport";
import "../utils/passport";
import * as db from "../db";
import { RequestHandler } from "../utils";
import { generateToken } from "../utils/jwtUtils";
import { AuthRepository } from "../repositories";

const requestHandler = new RequestHandler();
const authRepo = new AuthRepository();

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

      const userInDatabase = await authRepo.GetUserByProvider(
        user.providerId,
        user.provider
      );

      //   const query = {
      //     text: "SELECT sp_create_user($1, $2, $3, $4, $5, $6, $7, $8)",
      //     values: [
      //       user.providerId,
      //       user.familyName,
      //       user.givenName,
      //       user.email,
      //       user.photo,
      //       user.provider,
      //       1,
      //       "cong",
      //     ],
      //   };

      //   const { rowCount = 0 } = await db.query(query);
      //   if (rowCount !== 1) {
      //     requestHandler.sendError(res);
      //     return;
      //   }

      res.status(200).json({
        token: generateToken(user),
      });

      // var token = jwt.sign({
      //     data: {
      //         Id: req.user.id,
      //         Name: req.user.name,
      //         Email: req.user.emails[0].value,
      //         Photo: req.user.photos[0].value,
      //     }
      // }, PRIVATE_KEY, { expiresIn: '1h' });

      // // return user details
      // res.status(200).json({
      //     token,
      // });

      // const token = generateToken(user);
    } catch (ex) {
      console.log(ex);
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
}

export default new AuthController();
