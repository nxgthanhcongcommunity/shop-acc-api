import { Table, Column, Model, DataType, HasOne, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { sequelize } from "../db";
import { Optional } from "sequelize";
import Category from './categoryModel';
import Quantity from './quantityModel';

interface IProductAttributes {
  id: number;
  name: string;
  price: number;
  mainFileUrl: string;
  mainFileCLDId: string;
  childsFilesUrl: string;
  childsFilesCLDId: string;
  code: string;
  server: string;
  loginType: string;
  operatingSystem: string;
  gemChono: number;
  descriptions: string;
  categoryId: number;
}

interface IProductCreationAttributes extends Optional<IProductAttributes, 'id'> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Products",
})
class Product extends Model<IProductAttributes, IProductCreationAttributes> {

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
  name!: string;

  @Column({
    type: DataType.DECIMAL,
    allowNull: false,
  })
  price!: number;

  @Column({
    type: DataType.STRING,
  })
  mainFileUrl: string;

  @Column({
    type: DataType.STRING,
  })
  childsFilesUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mainFileCLDId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  childsFilesCLDId!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  server!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  loginType!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  operatingSystem!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  gemChono!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  descriptions!: string;

  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  categoryId!: number;

  @BelongsTo(() => Category, 'categoryId')
  category: Category;

  @HasOne(() => Quantity, 'productId')
  quantity: Quantity;
}

export default Product;
