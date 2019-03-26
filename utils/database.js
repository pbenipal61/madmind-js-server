const Sequelize = require('sequelize');




const sequelize = new Sequelize('MadMindQuiz', 'root12', 'pSeHrHjM1002',
    {
        dialect: 'mysql', host: 'localhost', port: 8889,
        logging: false
    });


module.exports = sequelize;



