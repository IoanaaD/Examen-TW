const modules = require("../configDB");
const sequelize = modules.sequelize;
const DataTypes = modules.DataTypes;

//Modelul (Tabelul pentru Video)
const Video = sequelize.define("Video", {
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
      min: 5,
    },
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      min: 5,
    },
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isUrl: true,
    },
  },
});

module.exports = Video;
