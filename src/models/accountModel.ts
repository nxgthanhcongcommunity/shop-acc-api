import { Optional, } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany, HasOne } from 'sequelize-typescript';
import Balance from './balanceModel';

interface IAccountAttributes {
  id: number;
  code: string;
  idAtProvider: string;
  familyName: string;
  givenName: string;
  email: string;
  passwordHash: string;
  isVerifyEmail: boolean;
  photo: string;
  providerName: string;
  role: string;
}

interface IAccountCreationAttributes extends Optional<IAccountAttributes, 'id'> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Accounts",
})
class Account extends Model<IAccountAttributes, IAccountCreationAttributes> {

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
  })
  idAtProvider: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  familyName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  givenName!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email!: string;

  @Column({
    type: DataType.STRING,
  })
  passwordHash: string;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  })
  isVerifyEmail!: boolean;

  @Column({
    type: DataType.STRING,
  })
  photo: string;

  @Column({
    type: DataType.STRING,
  })
  providerName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  role!: string;

  @HasOne(() => Balance, 'accountId')
  balance: Balance;
}

export default Account;