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
  transactionIdAtProvider: number;
  gateway: string;
  transactionDate: string;
  accountNumber: string;
  code: string;
  content: string;
  transferType: string;
  transferAmount: number;
  accumulated: number;
  subAccount: string;
  referenceCode: string;
  description: string;
  raw: string;
  succeed: boolean;
  accountId: number;
}

interface ITransactionCreationAttributes
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
    type: DataType.INTEGER,
    allowNull: false,
  })
  transactionIdAtProvider!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  gateway!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transactionDate!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  accountNumber!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  transferType!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  transferAmount!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  accumulated!: number;

  @Column({
    type: DataType.STRING,
  })
  subAccount: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  referenceCode!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  description!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  raw!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  succeed!: boolean;

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
