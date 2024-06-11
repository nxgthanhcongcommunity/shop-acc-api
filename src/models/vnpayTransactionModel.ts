import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";
import Account from "./accountModel";

interface IVnpayTransactionAttributes {
  id: number;
  vnp_Version: string;
  vnp_Command: string;
  vnp_TmnCode: string;
  vnp_Amount: number;
  vnp_BankCode: string;
  vnp_CreateDate: string;
  vnp_CurrCode: string;
  vnp_IpAddr: string;
  vnp_Locale: string;
  vnp_OrderInfo: string;
  vnp_OrderType: string;
  vnp_ReturnUrl: string;
  vnp_ExpireDate: string;
  vnp_TxnRef: string;
  vnp_SecureHash: string;
  accountId: number;
}

interface IVnpayTransactionCreationAttributes
  extends Optional<IVnpayTransactionAttributes, "id"> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "VnpayTransactions",
})
class VnpayTransaction extends Model<
  IVnpayTransactionAttributes,
  IVnpayTransactionCreationAttributes
> {
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
  vnp_Version!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_Command!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_TmnCode!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  vnp_Amount!: number;

  @Column({
    type: DataType.STRING,
  })
  vnp_BankCode: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_CreateDate!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_CurrCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_IpAddr!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_Locale!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_OrderInfo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_OrderType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_ReturnUrl!: string;

  @Column({
    type: DataType.STRING,
  })
  vnp_ExpireDate: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_TxnRef!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  vnp_SecureHash!: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @BelongsTo(() => Account, "accountId")
  account: Account;
}

export default VnpayTransaction;
