import utils, { RequestHandler } from "../utils";

const requestHandler = new RequestHandler();

class MasterDataController {
  async GetByKey(req, res) {
    try {
      const data = {
        logoUrl: "dgb-logo.png",
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
            code: "BN-5NWKQO",
            column: {
              pc: 4,
              mb: 1,
            },
            isSeeMore: true,
          },
          {
            code: "BN-B8AXNI",
            column: {
              pc: 2,
              mb: 1,
            },
          },
          {
            code: "BN-W8VJQQ",
          },
          {
            code: "BN-MPIWVW",
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
