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

interface ITransactionAttributes {
  id: number;
  provider: "VNPAY";
  transactionNo: string;
  refNo: string;
  amount: number;
  orderInfo: string;
  payDate: string;
  succeed: boolean;
  message: string;
  raw: string;
  accountId: number;
}

export interface ITransactionCreationAttributes
  extends Optional<ITransactionAttributes, "id"> {}

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Transactions",
})
class Transaction extends Model<
  ITransactionAttributes,
  ITransactionCreationAttributes
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
  provider!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  orderInfo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  payDate!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  succeed!: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  message!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transactionNo!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  refNo!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  raw!: string;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @BelongsTo(() => Account, "accountId")
  account: Account;
}

export default Transaction;
