
import { Optional, } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table, HasMany } from 'sequelize-typescript';
import Product from './productModel';

interface ICategoryAttributes {
  id: number;
  name: string;
  code: string;
  bannerCode: string;
  mainFileUrl: string;
  mainFileCLDId: string;
}

interface ICategoryCreationAttributes extends Optional<ICategoryAttributes, 'id'> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Categories",
})
class Category extends Model<ICategoryAttributes, ICategoryCreationAttributes> {

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
    type: DataType.STRING,
    allowNull: false,
  })
  code!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  bannerCode!: string;

  @Column({
    type: DataType.STRING,
  })
  mainFileUrl: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  mainFileCLDId!: string;

  @HasMany(() => Product, 'categoryId')
  products: Product[];

}

export default Category;