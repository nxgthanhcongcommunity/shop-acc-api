import { QueryTypes } from "sequelize";
import { BalanceModel, TransactionModel } from "../models";
import { RequestHandler } from "../utils";
import moment from "moment";
import config from "config";

class TransactionController {
  async SEPaymentHook(req, res) {
    try {
      const reqObj = req.body;
      const accountId = reqObj.content.split(" ").slice(-1)[0];

      const transactionObj = await TransactionModel.create({
        gateway: reqObj.gateway,
        transactionDate: reqObj.transactionDate,
        accountNumber: reqObj.accountNumber,
        code: "" + reqObj.code,
        content: reqObj.content,
        transferType: reqObj.transferType,
        transferAmount: reqObj.transferAmount,
        accumulated: reqObj.accumulated,
        subAccount: reqObj.subAccount,
        referenceCode: reqObj.referenceCode,
        description: reqObj.description,
        transactionIdAtProvider: reqObj.id,
        raw: JSON.stringify(reqObj),
        accountId: accountId,
        succeed: true,
      });

      await BalanceModel.increment("amount", {
        by: reqObj.transferAmount,
        where: {
          accountId: accountId,
        },
      });

      // RequestHandler.sendSucceed(res, );
      res.send({ success: true });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async Get(req, res) {
    try {
      const { page, limit, name = "" } = req.query;

      // const records = await sequelize.query(
      //   `
      //   SELECT
      //     id,
      //     "transactionIdAtProvider",
      //     gateway,
      //     "transactionDate",
      //     "accountNumber",
      //     code,
      //     content,
      //     "transferType",
      //     "transferAmount",
      //     accumulated,
      //     "subAccount",
      //     "referenceCode",
      //     description,
      //     "createdAt",
      //     "updatedAt",
      //     "raw"
      //   FROM
      //     public."Transactions"
      //   -- limit :pLimit offet :pOffset
      // `,
      //   {
      //     type: QueryTypes.SELECT,
      //   }
      // );

      RequestHandler.sendSucceed(res, { total: 0, data: [] });
    } catch (err) {
      console.log(err);
      RequestHandler.sendError(res);
    }
  }

  async CreatePaymentUrl(req, res) {


    process.env.TZ = 'Asia/Ho_Chi_Minh';

    let date = new Date();
    let createDate = moment(date).format('YYYYMMDDHHmmss');

    let ipAddr = req.headers['x-forwarded-for'] ||
      req.connection.remoteAddress ||
      req.socket.remoteAddress ||
      req.connection.socket.remoteAddress;

    let config = require('config');

    const vnpayConfig = config.get('vnpConfig');

    let tmnCode = vnpayConfig.vnp_TmnCode;
    let secretKey = vnpayConfig.vnp_HashSecret;
    let vnpUrl = vnpayConfig.vnp_Url;
    let returnUrl = vnpayConfig.vnp_ReturnUrl;
    let orderId = moment(date).format('DDHHmmss');
    let amount = req.body.amount;
    let currCode = 'VND';
    let vnp_Params = {};
    vnp_Params['vnp_Version'] = '2.1.0';
    vnp_Params['vnp_Command'] = 'pay';
    vnp_Params['vnp_TmnCode'] = tmnCode;
    vnp_Params['vnp_Locale'] = "vn";
    vnp_Params['vnp_CurrCode'] = currCode;
    vnp_Params['vnp_TxnRef'] = orderId;
    vnp_Params['vnp_OrderInfo'] = 'Thanh toan cho ma GD:' + orderId;
    vnp_Params['vnp_OrderType'] = 'other';
    vnp_Params['vnp_Amount'] = amount * 100;
    vnp_Params['vnp_ReturnUrl'] = returnUrl;
    vnp_Params['vnp_IpAddr'] = ipAddr;
    vnp_Params['vnp_CreateDate'] = createDate;
    // vnp_Params['vnp_BankCode'] = "VNBANK";
    // vnp_Params['vnp_BankCode'] = "INTCARD";
    vnp_Params['vnp_BankCode'] = "VNPAYQR";
    //INTCARD

    vnp_Params = sortObject(vnp_Params);

    let querystring = require('qs');
    let signData = querystring.stringify(vnp_Params, { encode: false });
    let crypto = require("crypto");
    let hmac = crypto.createHmac("sha512", secretKey);
    let signed = hmac.update(new Buffer(signData, 'utf-8')).digest("hex");
    vnp_Params['vnp_SecureHash'] = signed;
    vnpUrl += '?' + querystring.stringify(vnp_Params, { encode: false });

    return res.send({ vnpUrl });

  }
}

function sortObject(obj) {
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

export default new TransactionController();
