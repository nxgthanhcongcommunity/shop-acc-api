import { BannerModel } from "../models";
import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();


const readXlsxFile = require("read-excel-file/node");

class BannerController {
  async Upload(req, res) {
    try {
      if (req.file == undefined) {
        return res.status(400).send("Please upload an excel file!");
      }

      let path =
        global.__basedir + "/resources/static/assets/uploads/" + req.file.filename;

      const rows = await readXlsxFile(path);
      rows.shift();

      let banners = [];

      rows.forEach((row) => {
        let banner = {
          name: row[0],
          code: row[1],
        };

        banners.push(banner);
      });

      var result = await BannerModel.bulkCreate(banners, { ignoreDuplicates: true });

      res.send({
        "ok": true,
      })
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  }
  async GetBanners(req, res) {
    BannerModel.findAll()
      .then((data) => {
        requestHandler.sendSucceed(res, data);
      })
      .catch((err) => {
        console.log(err);
        requestHandler.sendError(res);
      });
  };
}

export default new BannerController();
