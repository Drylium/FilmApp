import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

export const Comment = sequelize.define("Comment", {
  text: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  movieId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});