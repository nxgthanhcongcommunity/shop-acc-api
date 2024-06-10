import { mailOptions, transporter } from "../utils/mailClient";
import {
  BalanceModel,
  InvoiceDetailModel,
  InvoiceModel,
  QuantityModel,
  SendMailModel,
} from "../models";
import utils from "../utils";

interface ICreateRequest {
  invoice: any;
  invoiceDetails: any;
}

class InvoiceBusiness {
  async Create(reqObj: ICreateRequest) {
    try {
      const { invoice, invoiceDetails } = reqObj;

      const invoiceObj = await InvoiceModel.create({
        ...invoice,
        code: `INV-${utils.generateUniqueString(6)}`,
        discount: 0,
        paymentStatus: "SUCCEED",
        paymentMethod: "DIAMOND",
      });

      await InvoiceDetailModel.bulkCreate(
        invoiceDetails.map((item) => {
          item.invoiceId = invoiceObj.id;
          return item;
        })
      );

      await BalanceModel.decrement("amount", {
        by: invoice.totalAmount,
        where: {
          accountId: invoice.accountId,
        },
      });

      const countOfDetails = invoiceDetails.length;
      for (let i = 0; i < countOfDetails; i++) {
        const currentDetail = invoiceDetails[i];

        await QuantityModel.increment(
          {
            currentQuantity: -1 * currentDetail.quantity,
            soldQuantity: currentDetail.quantity,
          },
          {
            where: {
              productId: currentDetail.productId,
            },
          }
        );
      }

      await SendMailModel.create({
        from: "ngthanhcong666@gmail.com",
        to: "nxgthanhcongcommunity@gmail.com",
        subject: "[SHPACC]",
        text: "... have a good day",
        succeed: false,
      });

      // const result = await transporter.sendMail({
      //   ...mailOptions,
      //   to: "nxgthanhcongcommunity@gmail.com",
      // });

      return invoiceObj;
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

export default InvoiceBusiness;
