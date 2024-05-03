import * as express from "express";
import * as bodyParser from "body-parser";
import router from "./router";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(router);
  }
}

export default new App().app;
