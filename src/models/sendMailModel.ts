import { Optional, } from 'sequelize';
import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from 'sequelize-typescript';

interface ISendMailAttributes {
  id: number;
  from: string;
  to: string;
  subject: string;
  text: string;
  attempTimes: number;
  succeed: boolean;
}

interface ISendMailCreationAttributes extends Optional<ISendMailAttributes, 'id'> { }

@Table({
  timestamps: true,
  paranoid: true,
  tableName: "SendMails",
})
class SendMail extends Model<ISendMailAttributes, ISendMailCreationAttributes> {

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
  from!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  to!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  subject!: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  text!: string;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
    defaultValue: 0,
  })
  attempTimes!: number;

  @Column({
    type: DataType.BOOLEAN,
    allowNull: false,
  })
  succeed!: boolean;

}

export default SendMail;