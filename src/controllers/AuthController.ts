import { AuthBusiness } from "../business";
import BaseController from "./BaseController";

class AuthController extends BaseController {

  _authBusiness = new AuthBusiness();

  HandleGoggleLoginAsync = async (req, res) =>
    this.ProcessAsync(res, () => this._authBusiness.HandleGoggleLoginAsync(req));
}

export default new AuthController();
