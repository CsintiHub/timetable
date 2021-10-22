"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Class, {
        as: "ClassesHeld",
        foreignKey: "tutorId",
      });
      User.hasMany(models.Class, {
        as: "Classes",
        foreignKey: "studentId",
      });
      User.hasMany(models.Rating, {
        as: "Ratings",
        foreignKey: "ratedId",
      });
      User.hasMany(models.Rating, {
        as: "RatingsGiven",
        foreignKey: "raterId",
      });
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      tutor: DataTypes.BOOLEAN,
      subject: DataTypes.STRING,
      address: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
