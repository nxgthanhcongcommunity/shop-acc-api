import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Invoice from "./invoiceModel";
import Product from "./productModel";

export interface IInvoiceDetailAttributes {
  id: number;
  invoiceId: number;
  productId: number;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface IInvoiceDetailCreationAttributes
  extends Optional<IInvoiceDetailAttributes, "id"> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "InvoiceDetails",
})
class InvoiceDetail extends Model<
  IInvoiceDetailAttributes,
  IInvoiceDetailCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  quantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  unitPrice!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  totalPrice!: number;

  @ForeignKey(() => Invoice)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  invoiceId!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @BelongsTo(() => Invoice, "invoiceId")
  invoice: Invoice;

  @BelongsTo(() => Product, "productId")
  product: Product;
}

export default InvoiceDetail;
