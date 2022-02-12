const modules = require("../configDB");
const sequelize = modules.sequelize;
const DataTypes = modules.DataTypes;

//Modelul (Tabelul pentru Activitate)
const FavouriteList = sequelize.define("FavouriteList", {
  //Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 3,
    },
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  }
});

module.exports = FavouriteList;
