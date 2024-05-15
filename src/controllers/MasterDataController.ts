import utils, { RequestHandler } from "../utils";

const requestHandler = new RequestHandler();

class MasterDataController {
  async GetByKey(req, res) {
    try {
      const data = {
        logoUrl: "XoD1.gif",
        shopName: "Dragonball shop",
        sliders: [
          {
            code: utils.generateUniqueString(6),
            title: "Title cho slide số 1",
            imgUrl: "1143254.jpg",
          },
          {
            code: utils.generateUniqueString(6),
            title: "Title cho slide số 2",
            imgUrl: "2312321.jpg",
          },
          {
            code: utils.generateUniqueString(6),
            title: "Title cho slide số 3",
            imgUrl: "2344324.jpg",
          },
        ],
        banners: [
          {
            code: "BN-WJEPC2",
            column: {
              pc: 4,
              mb: 1,
            },
          },
          {
            code: "BN-WJEPC2",
            column: {
              pc: 2,
              mb: 1,
            },
          },
          {
            code: "BN-WJEPC2",
          },
          {
            code: "BN-WJEPC2",
          },
        ],
      };

      requestHandler.sendSucceed(res, data);
    } catch (ex) {
      requestHandler.sendError(res);
    }
  }
}

export default new MasterDataController();
