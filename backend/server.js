//Import express
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

const sequelize = require("./configDB");

app.use(express.json());

const favouriteListRoutes = require("./routes/FavouriteList");
app.use("/favouriteList", favouriteListRoutes);

const videoRoutes = require("./routes/Video");
app.use("/video", videoRoutes);

app.listen(9020, () =>
  console.log("Server has started at " + process.env.SERVER_URL)
);
