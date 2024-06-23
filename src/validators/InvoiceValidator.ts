import { checkSchema } from "express-validator";
import { GreaterThanZero, IsValueString } from "./utils";

class InvoiceValidator {
  CreateAsync = checkSchema({
    "invoice.totalAmount": GreaterThanZero("Invoice TotalAmount"),
    "invoice.accountCode": IsValueString("Invoice AccountCode"),
    invoiceDetails: {
      custom: {
        options: (value: any) => {
          if (!Array.isArray(value) || value.length === 0) {
            throw new Error("invoiceDetails must be a non-empty array");
          }
          return true;
        },
      },
    },
    "invoiceDetails.*.productId": {
      isNumeric: {
        errorMessage: "invoiceDetails.*.productId code must be a number",
      },
      custom: {
        options: (value: number) => {
          if (value <= 0) {
            throw new Error(
              "invoiceDetails.*.productId code must be greater than 0"
            );
          }
          return true;
        },
      },
    },
    "invoiceDetails.*.quantity": {
      isNumeric: {
        errorMessage: "invoiceDetails.*.quantity code must be a number",
      },
      custom: {
        options: (value: number) => {
          if (value <= 0) {
            throw new Error(
              "invoiceDetails.*.quantity code must be greater than 0"
            );
          }
          return true;
        },
      },
    },
    "invoiceDetails.*.unitPrice": {
      isNumeric: {
        errorMessage: "invoiceDetails.*.unitPrice code must be a number",
      },
      custom: {
        options: (value: number) => {
          if (value <= 0) {
            throw new Error(
              "invoiceDetails.*.unitPrice code must be greater than 0"
            );
          }
          return true;
        },
      },
    },
    "invoiceDetails.*.totalPrice": {
      isNumeric: {
        errorMessage: "invoiceDetails.*.totalPrice code must be a number",
      },
      custom: {
        options: (value: number) => {
          if (value <= 0) {
            throw new Error(
              "invoiceDetails.*.totalPrice code must be greater than 0"
            );
          }
          return true;
        },
      },
    },
  });
  GetInvoiceByCodeAsync = checkSchema({
    invoiceCode: IsValueString("Invoice Code"),
  });
  GetInvoiceDetailsAsync = checkSchema({
    invoiceCode: IsValueString("Invoice Code"),
  });
  GetPurchaseHistoryAsync = checkSchema({
    accountCode: IsValueString("Account Code"),
  });
}

export default InvoiceValidator;
