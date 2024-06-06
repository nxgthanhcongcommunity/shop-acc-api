import { Optional, } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';
import Product from './productModel';

interface IQuantityAttributes {
  id: number;
  productId: number;
  currentQuantity: number;
  soldQuantity: number;
  comingQuantity: number;
}

interface IQuantityCreationAttributes extends Optional<IQuantityAttributes, 'id'> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Quantities",
})
class Quantity extends Model<IQuantityAttributes, IQuantityCreationAttributes> {

  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id!: number;

  @ForeignKey(() => Product)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  productId!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  currentQuantity!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  soldQuantity: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  comingQuantity: number;

  @BelongsTo(() => Product, 'productId')
  product: Product;

}

export default Quantity;
