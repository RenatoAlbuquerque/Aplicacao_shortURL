"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class shortURL extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      shortURL.belongsTo(models.Users, {
        foreignKey: "user_id",
      });
    }
  }
  shortURL.init(
    {
      title: DataTypes.STRING,
      urlShort: DataTypes.STRING,
      click: DataTypes.NUMBER,
    },
    {
      sequelize,
      modelName: "shortURL",
    }
  );
  return shortURL;
};
