import { Op, Sequelize, where } from "sequelize";
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
        global.__basedir +
        "/resources/static/assets/uploads/" +
        req.file.filename;

      const rows = await readXlsxFile(path);
      rows.shift();

      let categories = [];

      rows.forEach((row) => {
        let category = {
          name: row[0],
          code: row[1],
          bannerCode: row[2],
        };

        categories.push(category);
      });

      var result = await CategoryModel.bulkCreate(categories, {
        ignoreDuplicates: true,
      });

      res.send({
        ok: true,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        message: "Could not upload the file: " + req.file.originalname,
      });
    }
  }
  async GetCategories(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      const data = await CategoryModel.findAll({
        offset: page > 0 ? (page - 1) * limit : null,
        limit: limit || null,
        where: {
          name: {
            [Op.and]: [
              Sequelize.where(
                Sequelize.fn("LENGTH", Sequelize.col("name")),
                ">",
                0
              ),
              {
                [Op.like]: `%${name}%`,
              },
            ],
          },
        },
        order: [["updatedAt", "DESC"]],
      });

      const total = await CategoryModel.count();

      requestHandler.sendSucceed(res, { total, data });
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
  async AddCategory(req, res) {
    try {
      const category = req.body;

      if (
        category == null ||
        ("" + category.name).length === 0 ||
        ("" + category.code).length === 0 ||
        ("" + category.bannerCode).length === 0
      ) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      const categoryObj = await CategoryModel.create(category);
      await categoryObj.save();

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async UpdateCategory(req, res) {
    try {
      const category = req.body;

      if (
        category == null ||
        ("" + category.name).length === 0 ||
        ("" + category.code).length === 0 ||
        ("" + category.bannerCode).length === 0
      ) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      const categoryObj = await CategoryModel.update(category, {
        where: {
          id: category.id,
        },
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async DeleteCategory(req, res) {
    try {
      const category = req.body;

      if (
        category == null ||
        ("" + category.name).length === 0 ||
        ("" + category.code).length === 0
      ) {
        requestHandler.sendClientError(res, "invalid input");
        return;
      }

      const categoryObj = await CategoryModel.destroy({
        where: {
          id: category.id,
        },
      });

      requestHandler.sendSucceed(res);
    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }
}

export default new CategoryController();