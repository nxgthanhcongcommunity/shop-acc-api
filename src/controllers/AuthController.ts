import { AuthBusiness } from "../business";
import BaseController from "./BaseController";

// const { GOOGLE_CLIENT_ID } = process.env;
// const { OAuth2Client } = require("google-auth-library");
// const client = new OAuth2Client(GOOGLE_CLIENT_ID);

class AuthController extends BaseController {

  _authBusiness = new AuthBusiness();

  HandleGoggleLoginAsync = async (req, res) =>
    this.ProcessAsync(res, () => this._authBusiness.HandleGoggleLoginAsync(req.body));
}

export default new AuthController();
