import Sequelize from 'sequelize';

const sequelize = new Sequelize(process.env.DBNAME, process.env.DBUSER, process.env.DBPASS, {
    host: process.env.DBHOST,
    dialect: process.env.DBDIALECT,
    logging: false
});

export default sequelize;