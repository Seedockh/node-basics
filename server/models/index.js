import Sequelize from "sequelize";
import User from "./user";
import Project from "./project";

// postgres://USER:PASS@HOST:PORT/DBNAME
// createdb sanji.dev
export const db = new Sequelize(process.env.DATABASE_URL);

User.init(db);
Project.init(db);

Project.belongsTo(User, {
  as: 'user',
  onDelete: 'CASCADE',
  foreignKey: {
    name: 'user_uuid',
    allowNull: false
  }
});
