'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class QuestionAnswer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      QuestionAnswer.hasOne(models.Question, {foreignKey : 'id', sourceKey : 'questionId'})
    }
  };
  QuestionAnswer.init({
    questionId: DataTypes.INTEGER,
    answer: DataTypes.TEXT,
  }, {
    sequelize,
    paranoid: true,
    modelName: 'QuestionAnswer',
    tableName: 'question_answers',
  });
  return QuestionAnswer;
};