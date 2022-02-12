// Connecting to the DB
const { Sequelize, Op, Model, DataTypes } = require("sequelize");
// Option 1: Passing a connection URI
const sequelize = new Sequelize('sqlite::memory:', {
    logging: false,
  });

//Test the DB Connection
sequelize.authenticate()
.then(() => console.log('Database Successfully Connected'))
.catch(err => console.log('Error: ', err));

sequelize.sync();

module.exports = {
    sequelize: sequelize,
    Op: Op,
    Model: Model,
    DataTypes: DataTypes
};
