import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.sqlite"
});

export const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("SQLite connected");
  } catch (error) {
    console.error("Database error:", error);
  }
};