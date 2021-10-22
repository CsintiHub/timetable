"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Tutor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Tutor.hasMany(models.Class, {
      //   as: "Classes",
      //   foreignKey: "tutorId",
      // });
    }
  }
  Tutor.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      subject: DataTypes.STRING,
      price: DataTypes.INTEGER,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Tutor",
    }
  );
  return Tutor;
};
