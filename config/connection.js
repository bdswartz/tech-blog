const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(proc.env.DB_Name, proc.env.DB_User, proc.env.DB_PW,{
    host: 'localhost',
    dialect: 'mysql',
    port: 3306
});

module.export = sequelize;