import { ICreatePaymentUrl } from "interfaces";
import BaseBusiness from "./BaseBusiness";
import moment from "moment";

class TransactionBusiness {
  CreatePaymentUrl = async (reqObj: ICreatePaymentUrl) => {
    try {
      const { amount, ipAddr } = reqObj;

      process.env.TZ = "Asia/Ho_Chi_Minh";

      let date = new Date();
      let createDate = moment(date).format("YYYYMMDDHHmmss");

      let config = require("config");

      const vnpayConfig = config.get("vnpConfig");

      let tmnCode = vnpayConfig.vnp_TmnCode;
      let secretKey = vnpayConfig.vnp_HashSecret;
      let vnpUrl = vnpayConfig.vnp_Url;
      let returnUrl = vnpayConfig.vnp_ReturnUrl;
      let orderId = moment(date).format("DDHHmmss");
      let currCode = "VND";
      let vnp_Params = {};
      vnp_Params["vnp_Version"] = "2.1.0";
      vnp_Params["vnp_Command"] = "pay";
      vnp_Params["vnp_TmnCode"] = tmnCode;
      vnp_Params["vnp_Locale"] = "vn";
      vnp_Params["vnp_CurrCode"] = currCode;
      vnp_Params["vnp_TxnRef"] = orderId;
      vnp_Params["vnp_OrderInfo"] = "Thanh toan cho ma GD:" + orderId;
      vnp_Params["vnp_OrderType"] = "other";
      vnp_Params["vnp_Amount"] = amount * 100;
      vnp_Params["vnp_ReturnUrl"] = returnUrl;
      vnp_Params["vnp_IpAddr"] = ipAddr;
      vnp_Params["vnp_CreateDate"] = createDate;
      // vnp_Params['vnp_BankCode'] = "VNBANK";
      // vnp_Params['vnp_BankCode'] = "INTCARD";
      // vnp_Params['vnp_BankCode'] = "VNPAYQR";

      vnp_Params = this.sortObject(vnp_Params);

      let querystring = require("qs");
      let signData = querystring.stringify(vnp_Params, { encode: false });
      let crypto = require("crypto");
      let hmac = crypto.createHmac("sha512", secretKey);
      let signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");
      vnp_Params["vnp_SecureHash"] = signed;
      vnpUrl += "?" + querystring.stringify(vnp_Params, { encode: false });

      return BaseBusiness.Success({
        paymentUrl: vnpUrl,
      });
    } catch (err) {
      return BaseBusiness.Error;
    }
  };

  sortObject(obj) {
    let sorted = {};
    let str = [];
    let key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) {
        str.push(encodeURIComponent(key));
      }
    }
    str.sort();
    for (key = 0; key < str.length; key++) {
      sorted[str[key]] = encodeURIComponent(obj[str[key]]).replace(/%20/g, "+");
    }
    return sorted;
  }
}

export default TransactionBusiness;
