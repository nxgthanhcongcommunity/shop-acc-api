import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from "sequelize-typescript";
import Account from "./accountModel";
import InvoiceDetail from "./invoiceDetailModel";

export interface IInvoiceAttributes {
  id: number;
  code: string;
  accountId: number;
  totalAmount: number;
  discount: number;
  paymentStatus: string;
  paymentMethod: string;
}

export interface IInvoiceCreationAttributes
  extends Optional<IInvoiceAttributes, "id"> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Invoices",
})
class Invoice extends Model<IInvoiceAttributes, IInvoiceCreationAttributes> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  totalAmount!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  discount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentStatus!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  paymentMethod!: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @BelongsTo(() => Account, "accountId")
  account: Account;

  @HasMany(() => InvoiceDetail, "invoiceId")
  invoiceDetails: InvoiceDetail[];
}

export default Invoice;
