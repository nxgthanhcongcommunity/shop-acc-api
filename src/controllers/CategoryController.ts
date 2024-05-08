import { CategoryModel } from "../models";
import { RequestHandler } from "../utils";
const requestHandler = new RequestHandler();


const readXlsxFile = require("read-excel-file/node");

class CategoryController {
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
          bannerCode: row[2],
        };

        banners.push(banner);
      });

      var result = await CategoryModel.bulkCreate(banners, { ignoreDuplicates: true });

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
  async GetCategories(req, res) {
    CategoryModel.findAll()
      .then((data) => {
        res.send(data);
      })
      .catch((err) => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials.",
        });
      });
  };
}

export default new CategoryController();
