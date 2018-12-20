import Sequelize, { Model } from "sequelize";

export default class Project extends Model {
  static init(database) {
    return super.init(
      {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true
        },
        name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
            notEmpty: true
          }
        }
      },
      {
        tableName: "projects",
        sequelize: database,

        indexes: [
          {
            unique: true,
            fields: ["id","user_uuid"]
          }
        ],
        hooks: {
          async beforeValidate(projectInstance) {
            console.log("---------  BEFOREVALIDATE PROJECT  -------------");
            //userInstance.password_digest = await userInstance.generateHash();
          }
        },
      }
    );
  }
}
