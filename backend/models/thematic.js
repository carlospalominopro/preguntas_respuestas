'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Thematic extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Thematic.hasMany(models.Question, {foreignKey : 'thematicId', sourceKey : 'id'})
    }
  };
  Thematic.init({
    thematic: DataTypes.TEXT,
    color: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Thematic',
    tableName: 'thematics',
  });
  return Thematic;
};