import { Optional } from "sequelize";
import {
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from "sequelize-typescript";

interface IKeypairAttributes {
  id: number;
  key: string;
  value: string;
}

interface IKeypairCreationAttributes
  extends Optional<IKeypairAttributes, "id"> {}

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "Keypairs",
})
class Keypair extends Model<IKeypairAttributes, IKeypairCreationAttributes> {
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
  key!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  value!: string;
}

export default Keypair;
