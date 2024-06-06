
import { Optional, } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany, HasOne } from 'sequelize-typescript';
import Account from './accountModel';

interface IBalanceAttributes {
  id: number;
  accountId: number;
  amount: number;
}

interface IBalanceCreationAttributes extends Optional<IBalanceAttributes, 'id'> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Balances",
})
class Balance extends Model<IBalanceAttributes, IBalanceCreationAttributes> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  amount!: number;

  @ForeignKey(() => Account)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  accountId!: number;

  @BelongsTo(() => Account, 'accountId')
  account: Account;

}

export default Balance;