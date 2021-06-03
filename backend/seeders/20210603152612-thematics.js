'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    queryInterface.bulkDelete('thematics', null, {});

    return queryInterface.bulkInsert('thematics', [
      {
        id : 1,
        thematic: 'Tecnológica',
        color: '#00FFFF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : 2,
        thematic: 'Ambiental',
        color: '#30FF00',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : 3,
        thematic: 'Política',
        color: '#FFB100',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : 4,
        thematic: 'Social',
        color: '#00BFFF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id : 5,
        thematic: 'Otra',
        color: '#9000FF',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ]);

  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('thematics', null, {});
  }
};
