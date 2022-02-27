"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("shortURLs", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      user_id: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: { model: "Users", key: "id" },
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      urlShort: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      click: {
        type: Sequelize.INTEGER,
        allowNull: true,
        defaultValue: 0,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("shortURLs");
  },
};
