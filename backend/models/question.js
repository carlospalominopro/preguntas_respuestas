'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Question extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Question.hasMany(models.QuestionAnswer, {foreignKey : 'questionId', sourceKey : 'id'})
      Question.hasOne(models.Thematic, {foreignKey : 'id', sourceKey : 'thematicId'})
    }
  };
  Question.init({
    question: DataTypes.TEXT,
    thematicId: DataTypes.INTEGER,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'Question',
    tableName: 'questions',
  });
  return Question;
};