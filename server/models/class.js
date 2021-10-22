"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Class extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Class.belongsTo(models.User, {
        as: "Tutor",
        foreignKey: "tutorId",
      });
      Class.belongsTo(models.User, {
        as: "Student",
        foreignKey: "studentId",
      });
      // Class.belongsTo(models.User, {
      //   as: "User",
      //   foreignKey: "userId",
      // });
    }
  }
  Class.init(
    {
      online: DataTypes.BOOLEAN,
      start: DataTypes.DATE,
      duration: DataTypes.INTEGER,
      end: DataTypes.DATE,
      accepted: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Class",
    }
  );
  return Class;
};
