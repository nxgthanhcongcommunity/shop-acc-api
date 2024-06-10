import utils, { RequestHandler } from "../utils";

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
            name: "Acc sẵn char giá rẻ đến vip",
            code: "BN-5NWKQO",
            column: {
              pc: 4,
              mb: 1,
            },
            isSeeMore: true,
          },
          {
            name: "Acc reroll abc",
            code: "BN-B8AXNI",
            column: {
              pc: 2,
              mb: 1,
            },
          },
          {
            name: "Acc trên 50k",
            code: "BN-W8VJQQ",
          },
          {
            name: "Acc trên 100k",
            code: "BN-MPIWVW",
          },
        ],
      };

      RequestHandler.sendSucceed(res, data);
    } catch (ex) {
      RequestHandler.sendError(res);
    }
  }
}

export default new MasterDataController();
