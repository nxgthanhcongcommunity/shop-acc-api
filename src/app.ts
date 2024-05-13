import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import router from "./router";
import "dotenv/config";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config(): void {

    global.__basedir = __dirname + "/..";

    this.app.use(cors());
    this.app.use('/public', express.static('uploads'))

    this.app.set('views', './src/views');
    this.app.set('view engine', 'ejs');

    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(express.json());
    this.app.use(router);


    this.app.get('/', (req, res) => {
      res.render('home');
    });
    this.app.get('/login', (req, res) => {
      res.render('auth/login');
    });

  }
}

export default new App().app;
