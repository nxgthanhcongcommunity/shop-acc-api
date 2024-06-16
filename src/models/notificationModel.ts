import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
  HasMany,
  HasOne,
} from "sequelize-typescript";
import Account from "./accountModel";

interface INotificationAttributes {
  id: number;
  accountId: number;
  type: string;
  code: string;
  title: string;
  content: string;
  isViewed: boolean;
}

export interface INotificationCreationAttributes
  extends Optional<INotificationAttributes, "id"> {}

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Notifications",
})
class Notification extends Model<
  INotificationAttributes,
  INotificationCreationAttributes
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
  code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  type!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  title!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  isViewed!: boolean;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @BelongsTo(() => Account, "accountId")
  account: Account;
}

export default Notification;
