import { sequelize } from "../db";
import { DataTypes } from "sequelize";

const SendMail = sequelize.define(
  "SendMail",
  {
    from: {
      type: DataTypes.STRING,
    },
    to: {
      type: DataTypes.STRING,
    },
    subject: {
      type: DataTypes.STRING,
    },
    text: {
      type: DataTypes.TEXT,
    },
    attempTimes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    succeed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    }
  },
  {
    tableName: "SendMails",
    paranoid: true,
  }
);

export default SendMail;
