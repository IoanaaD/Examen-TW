let sequelize = require("../configDB.js");
const FavouriteListTable = require("./FavouriteList.js");
const VideoTable = require("./Video.js");

FavouriteListTable.hasMany(VideoTable, {
  foreignKey: "favouriteListId",
  onUpdate: "cascade",
});

VideoTable.belongsTo(FavouriteListTable, {
  foreignKey: "favouriteListId",
  onUpdate: "cascade",
});

module.exports = {
  sequelize,
  FavouriteListTable,
  VideoTable,
};
