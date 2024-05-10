import { Op, Sequelize, where } from "sequelize";
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

    try {

      const { page, limit, name = '' } = req.query;

      const data = await BannerModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        where: {
          name: {
            [Op.and]: [
              Sequelize.where(Sequelize.fn('LENGTH', Sequelize.col('name')), '>', 0),
              {
                [Op.like]: `%${name}%`
              }
            ]
          }
        },
        order: [['updatedAt', 'DESC']],
      });

      const total = await BannerModel.count();

      console.log(total)

      requestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }

  }
  async AddBanner(req, res) {
    try {
      const banner = req.body;

      if (banner == null || ('' + banner.name).length === 0 || ('' + banner.code).length === 0) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      const bannerObj = await BannerModel.create(banner);
      await bannerObj.save();

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err)
      requestHandler.sendError(res);
    }
  }

  async UpdateBanner(req, res) {
    try {
      const banner = req.body;

      if (banner == null || ('' + banner.name).length === 0 || ('' + banner.code).length === 0) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      const bannerObj = await BannerModel.update(banner, {
        where: {
          id: banner.id
        }
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err)
      requestHandler.sendError(res);
    }
  }

  async DeleteBanner(req, res) {
    try {
      const banner = req.body;

      if (banner == null || ('' + banner.name).length === 0 || ('' + banner.code).length === 0) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      const bannerObj = await BannerModel.destroy({
        where: {
          id: banner.id
        }
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err)
      requestHandler.sendError(res);
    }
  }

}

export default new BannerController();
