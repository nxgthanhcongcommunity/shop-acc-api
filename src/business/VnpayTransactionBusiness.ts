import config from "config";
import crypto from "crypto";
import moment from "moment";
import qs from "qs";
import { NOTIFICATION_TYPES } from "../constants";
import { IReturnRequest } from "../interfaces";
import {
  AccountRepository,
  BalanceRepository,
  NotificationRepository,
  TransactionRepository,
  VnpayTransactionRepository,
} from "../repositories";
import utils, { wsUtils } from "../utils";
import BaseBusiness from "./BaseBusiness";

class VnpayTransactionBusiness {
  _vnpayConfig = config.get("vnpConfig");
  _accountRepository = new AccountRepository();
  _vnpayTransactionRepository = new VnpayTransactionRepository();
  _transactionRepository = new TransactionRepository();
  _balanceRepository = new BalanceRepository();
  _notificationRepository = new NotificationRepository();

  CreatePaymentUrl = async (req) => {
    process.env.TZ = "Asia/Ho_Chi_Minh";
    try {
      const ipAddr =
        req.headers["x-forwarded-for"] ||
        req.connection.remoteAddress ||
        req.socket.remoteAddress ||
        req.connection.socket.remoteAddress;
      const { bankCode, amount, accountCode } = req.body;

      const account = await this._accountRepository.GetAccountByCode({
        accountCode,
      });
      if (account == null) {
        return BaseBusiness.Error("Account not found!");
      }

      const date = new Date();
      const createDate = moment(date).format("YYYYMMDDHHmmss");
      const refNo = `REF-${utils.generateUniqueString(6)}`;

      const vnpayTransaction =
        await this._vnpayTransactionRepository.CreateVnpayTransaction({
          vnp_Version: "2.1.0",
          vnp_Command: "pay",
          vnp_TmnCode: this._vnpayConfig.vnp_TmnCode,
          vnp_Amount: amount * 100,
          vnp_BankCode: bankCode,
          vnp_CreateDate: createDate,
          vnp_CurrCode: "VND",
          vnp_IpAddr: ipAddr,
          vnp_Locale: "vn",
          vnp_OrderInfo: "Thanh toan cho ma GD: " + refNo,
          vnp_OrderType: "other",
          vnp_ReturnUrl: this._vnpayConfig.vnp_ReturnUrl,
          vnp_TxnRef: refNo,
          vnp_SecureHash: "",
          accountId: account.id,
        });

      const preParamObj = {
        vnp_Version: vnpayTransaction.vnp_Version,
        vnp_Command: vnpayTransaction.vnp_Command,
        vnp_TmnCode: vnpayTransaction.vnp_TmnCode,
        vnp_Locale: vnpayTransaction.vnp_Locale,
        vnp_CurrCode: vnpayTransaction.vnp_CurrCode,
        vnp_TxnRef: vnpayTransaction.vnp_TxnRef,
        vnp_OrderInfo: vnpayTransaction.vnp_OrderInfo,
        vnp_OrderType: vnpayTransaction.vnp_OrderType,
        vnp_Amount: vnpayTransaction.vnp_Amount,
        vnp_ReturnUrl: vnpayTransaction.vnp_ReturnUrl,
        vnp_IpAddr: vnpayTransaction.vnp_IpAddr,
        vnp_CreateDate: vnpayTransaction.vnp_CreateDate,
        ...(() => {
          if (
            vnpayTransaction.vnp_BankCode != null &&
            vnpayTransaction.vnp_BankCode.length > 0
          ) {
            return {
              vnp_BankCode: vnpayTransaction.vnp_BankCode,
            };
          }
          return null;
        })(),
      };
      const sortedParams = this.sortObject(preParamObj);
      const signed = this.createSecureHash(sortedParams);

      sortedParams["vnp_SecureHash"] = signed;
      vnpayTransaction.vnp_SecureHash = signed;

      await vnpayTransaction.save();

      const vnpUrl =
        this._vnpayConfig.vnp_Url +
        "?" +
        qs.stringify(sortedParams, { encode: false });

      return BaseBusiness.Success({
        paymentUrl: vnpUrl,
      });
    } catch (err) {
      console.log(err);
      return BaseBusiness.Error();
    }
  };

  Return = async (req) => {
    try {
      const vnp_Params: IReturnRequest = req.body;

      const secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      let sortedParams = this.sortObject(vnp_Params);
      const signed = this.createSecureHash(sortedParams);

      if (secureHash === signed) {
        //Kiem tra xem du lieu trong db co hop le hay khong va thong bao ket qua
        return BaseBusiness.Success({
          code: sortedParams["vnp_ResponseCode"],
          vnp_Params,
        });
      } else {
        return BaseBusiness.Success({
          code: "97",
          vnp_Params,
        });
      }
    } catch (err) {
      return BaseBusiness.Error();
    }
  };

  IPN = async (req) => {
    try {
      var vnp_Params = req.query;
      var secureHash = vnp_Params["vnp_SecureHash"];

      delete vnp_Params["vnp_SecureHash"];
      delete vnp_Params["vnp_SecureHashType"];

      const signed = this.createSecureHash(this.sortObject(vnp_Params));

      if (secureHash !== signed) {
        return BaseBusiness.Success({
          RspCode: "97",
          Message: "Fail checksum",
        });
      }

      const vnpayTransaction =
        await this._vnpayTransactionRepository.GetVnpayTransactionByRef({
          vnp_TxnRef: vnp_Params["vnp_TxnRef"],
        });

      if (vnpayTransaction == null) {
        return BaseBusiness.Success({
          RspCode: "01",
          Message: "Order not found",
        });
      }

      if (vnpayTransaction.vnp_Amount != vnp_Params["vnp_Amount"]) {
        return BaseBusiness.Success({
          RspCode: "04",
          Message: "Amount invalid",
        });
      }

      const transaction = await this._transactionRepository.GetTransactionByRef({
        refNo: vnp_Params["vnp_TxnRef"],
      });
      if (transaction != null) {
        return BaseBusiness.Success({
          RspCode: "02",
          Message: "This order has been updated to the payment status",
        });
      }

      const newTransaction =
        await this._transactionRepository.CreateTransaction({
          provider: "VNPAY",
          transactionNo: vnp_Params["vnp_TransactionNo"],
          refNo: vnp_Params["vnp_TxnRef"],
          amount: vnp_Params["vnp_Amount"],
          orderInfo: vnp_Params["vnp_OrderInfo"],
          payDate: vnp_Params["vnp_PayDate"],
          succeed: false,
          message: `transactionDesc: ${this.getTransactionStatusDes(
            vnp_Params["vnp_TransactionStatus"]
          )} - responseDesc: ${this.getResponseCodeDes(
            vnp_Params["vnp_ResponseCode"]
          )}`,
          raw: JSON.stringify(vnp_Params),
          accountId: vnpayTransaction.accountId,
        });

      if (vnp_Params["vnp_ResponseCode"] == "00") {
        newTransaction.succeed = true;
        await newTransaction.save();

        await this._balanceRepository.UpdateBalance({
          accountId: vnpayTransaction.accountId,
          amount: vnpayTransaction.vnp_Amount,
        });

        const notification =
          await this._notificationRepository.CreateNotification({
            type: NOTIFICATION_TYPES.BALANCE,
            code: `NOT-${utils.generateUniqueString(6)}`,
            title: "Nạp tiền thành công",
            content: `Bạn đã nạp thành công ${vnpayTransaction.vnp_Amount} vào tài khoản`,
            isViewed: false,
            accountId: vnpayTransaction.account.id,
          });

        wsUtils.sendToAccount(
          vnpayTransaction.account.code,
          JSON.stringify(notification)
        );
      }

      return BaseBusiness.Success({ RspCode: "00", Message: "Success" });
    } catch (err) {
      return BaseBusiness.Error();
    }
  };

  createSecureHash(sortedParams: any) {
    const signData = qs.stringify(sortedParams, { encode: false });
    const hmac = crypto.createHmac("sha512", this._vnpayConfig.vnp_HashSecret);
    const signed = hmac.update(new Buffer(signData, "utf-8")).digest("hex");

    return signed;
  }

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

  getTransactionStatusDes(code: string) {
    switch (code) {
      case "00":
        return "Giao dịch thành công";
      case "01":
        return "Giao dịch chưa hoàn tất";
      case "02":
        return "Giao dịch bị lỗi";
      case "04":
        return "Giao dịch đảo (Khách hàng đã bị trừ tiền tại Ngân hàng nhưng GD chưa thành công ở VNPAY)";
      case "05":
        return "VNPAY đang xử lý giao dịch này (GD hoàn tiền)";
      case "06":
        return "VNPAY đã gửi yêu cầu hoàn tiền sang Ngân hàng (GD hoàn tiền)";
      case "07":
        return "Giao dịch bị nghi ngờ gian lận";
      case "09":
        return "GD Hoàn trả bị từ chối";
      default:
        return "";
    }
  }

  getResponseCodeDes(code: string) {
    switch (code) {
      case "00":
        return "Giao dịch thành công";
      case "07":
        return "Trừ tiền thành công. Giao dịch bị nghi ngờ (liên quan tới lừa đảo, giao dịch bất thường).";
      case "09":
        return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng chưa đăng ký dịch vụ InternetBanking tại ngân hàng.";
      case "10":
        return "Giao dịch không thành công do: Khách hàng xác thực thông tin thẻ/tài khoản không đúng quá 3 lần";
      case "11":
        return "Giao dịch không thành công do: Đã hết hạn chờ thanh toán. Xin quý khách vui lòng thực hiện lại giao dịch.";
      case "12":
        return "Giao dịch không thành công do: Thẻ/Tài khoản của khách hàng bị khóa.";
      case "13":
        return "Giao dịch không thành công do Quý khách nhập sai mật khẩu xác thực giao dịch (OTP). Xin quý khách vui lòng thực hiện lại giao dịch.";
      case "24":
        return "Giao dịch không thành công do: Khách hàng hủy giao dịch";
      case "51":
        return "Giao dịch không thành công do: Tài khoản của quý khách không đủ số dư để thực hiện giao dịch.";
      case "65":
        return "Giao dịch không thành công do: Tài khoản của Quý khách đã vượt quá hạn mức giao dịch trong ngày.";
      case "75":
        return "Ngân hàng thanh toán đang bảo trì.";
      case "79":
        return "Giao dịch không thành công do: KH nhập sai mật khẩu thanh toán quá số lần quy định. Xin quý khách vui lòng thực hiện lại giao dịch";
      case "99":
        return "Các lỗi khác (lỗi còn lại, không có trong danh sách mã lỗi đã liệt kê)";
      default:
        return "";
    }
  }
}

export default VnpayTransactionBusiness;
