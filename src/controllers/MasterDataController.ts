import BaseBusiness from "../business/BaseBusiness";
import utils, { RequestHandler } from "../utils";
import BaseController from "./BaseController";

class MasterDataController extends BaseController {
  GetByKey = async (req, res) =>
    await this.ProcessAsync(req, res, () =>
      BaseBusiness.Success({
        logoUrl: "logo_mhwxka",
        shopName: "",
        menuItems: [
          {
            title: "Kho tài khoản",
            subTitle: "games",
            subMenuItems: [
              {
                title: "Acc sẵn char giá rẻ đến vip",
                href: "#BN-5NWKQO",
              },
              {
                title: "Acc reroll abc",
                href: "#BN-B8AXNI",
              },
              {
                title: "Acc trên 50k",
                href: "#BN-W8VJQQ",
              },
              {
                title: "Acc trên 100k",
                href: "#BN-MPIWVW",
              },
            ],
          },
          {
            title: "Tính năng",
            subTitle: "info",
            subMenuItems: [
              {
                title: "Hướng dẫn thanh toán",
                href: "/",
              },
              {
                title: "Hướng dẫn mua acc",
                href: "/",
              },
            ],
          },
        ],
        highLightItem: {
          title: "Nạp thẻ",
          href: "/account-management/recharge",
        },
        sliders: [
          {
            code: utils.generateUniqueString(6),
            title: "Title cho slide số 1",
            cdlId: "shop-acc/BANNER-SHOPTIENZOMBIE-VN_hpnuyl",
          },
          {
            code: utils.generateUniqueString(6),
            title: "Title cho slide số 2",
            cdlId: "shop-acc/BANNER-SHOPTIENZOMBIE-VN_hpnuyl",
          },
          {
            code: utils.generateUniqueString(6),
            title: "Title cho slide số 3",
            cdlId: "shop-acc/BANNER-SHOPTIENZOMBIE-VN_hpnuyl",
          },
        ],
        banners: [
          {
            name: "Acc sẵn char giá rẻ đến vip",
            code: "BN-5NWKQO",
            tag: "Best seller",
            column: {
              pc: 4,
              mb: 1,
            },
            isSeeMore: true,
          },
          {
            name: "Acc reroll abc",
            code: "BN-B8AXNI",
            tag: "Best seller",
            column: {
              pc: 2,
              mb: 1,
            },
          },
          {
            name: "Acc trên 50k",
            code: "BN-W8VJQQ",
            tag: "Best seller",
          },
          {
            name: "Acc trên 100k",
            code: "BN-MPIWVW",
            tag: "Best seller",
          },
        ],
      })
    );
}

export default new MasterDataController();
