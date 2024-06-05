import { QueryTypes } from "sequelize";
import { sequelize } from "../db";
import { BalanceModel, InvoiceDetailModel, InvoiceModel, QuantityModel, SendMailModel } from "../models";
import { RequestHandler } from "../utils";

const requestHandler = new RequestHandler();


class InvoiceController {
  async Create(req, res) {
    try {
      const { invoice, invoiceDetails } = req.body;

      let invoiceObj;

      invoiceObj = await InvoiceModel.create(
        {
          ...invoice,
          paymentStatus: "SUCCEED",
          paymentMethod: "DIAMOND",
        }
      );

      await InvoiceDetailModel.bulkCreate(invoiceDetails.map(item => {
        item.invoiceId = invoiceObj.id
        return item;
      }));

      await BalanceModel.increment(
        'amount',
        {
          by: -1 * invoice.totalAmount,
          where: {
            accountId: invoice.accountId,
          },
        },
      );

      await QuantityModel.increment(
        {
          currentQuantity: -1,
          soldQuantity: 1,
        },
        {
          where: {
            productId: 2,
          },
        },
      );

      await SendMailModel.create({
        from: "ngthanhcong666@gmail.com",
        to: "nxgthanhcongcommunity@gmail.com",
        subject: "[SHPACC]",
        text: "... have a good day",
      })

      // const transporter = nodemailer.createTransport({
      //   service: 'gmail',
      //   auth: {
      //     user: 'ngthanhcong666@gmail.com',
      //     pass: 'qqq111!!!'
      //   }
      // });

      // var mailOptions = {
      //   from: "ngthanhcong666@gmail.com",
      //   to: "nxgthanhcongcommunity@gmail.com",
      //   subject: "[SHPACC]",
      //   text: "... have a good day",
      // };

      // await transporter.sendMail(mailOptions);

      // schedule.scheduleJob('*/5 * * * * *', function () {
      //   console.log('The answer to life, the universe, and everything!');
      // });


      requestHandler.sendSucceed(res, "ok");

    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }
  }

  async Get(req, res) {
    try {

      const { page, limit, name = "" } = req.query;

      const records = await sequelize.query(
        `
        select 
          a.Id as accountId,
          a.email,
          inv."totalAmount",
          inv.discount,
          inv."paymentStatus",
          inv."paymentMethod",
          inv."createdAt"
        from
          public."Invoices" inv
          inner join public."Accounts" a on a.Id = inv."accountId"
        -- limit :pLimit offet :pOffset
      `,
        {
          type: QueryTypes.SELECT,
        }
      );

      requestHandler.sendSucceed(res, { total: 0, data: records });

    } catch (err) {
      console.log(err);
      requestHandler.sendError(res);
    }

  }

}

export default new InvoiceController();
