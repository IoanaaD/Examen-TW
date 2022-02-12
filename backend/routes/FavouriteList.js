const express = require("express");
const router = express.Router();
const FavouriteList = require("../models").FavouriteListTable;
const Video = require("../models").VideoTable;

const validateFavouriteListBody = require("../middleware/validateFavouriteListBody");

const verifyFavouriteListExistance = async (id, res) => {
  const favouriteList = await FavouriteList.findByPk(id);
  if (!favouriteList) {
    return res.status(404).json({
      message: `Cannot find the favouriteList with the ${id} id`,
    });
  }
  return favouriteList;
};

router.post("/", validateFavouriteListBody, async (req, res) => {
  const favouriteList = FavouriteList.build({
    description: req.body.description,
    date: req.body.date,
  });

  try {
    const newFavouriteList = await favouriteList.save();
    res.status(201).json(newFavouriteList);
  } catch (error) {
    //bad request
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const favouriteLists = await FavouriteList.findAll();
    return res.json(favouriteLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//sort by date
router.get("/date/:sortType", async (req, res) => {
  try {
    const favouriteLists = await FavouriteList.findAll({
      order: [["date", req.params.sortType]],
    });
    return res.status(200).json(favouriteLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//pagination
router.get("/pagination", async (req, res) => {
  try {
    const pageSize = req.query.size;
    const pageNumber = req.query.page;
    const sortType = req.query.sortType;
    const limit = pageSize;
    const offset = pageNumber * pageSize;
    const favouriteLists = await FavouriteList.findAndCountAll({
      order: [["date", sortType]],
      limit,
      offset,
    });

    return res.status(200).json(favouriteLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const favouriteList = await FavouriteList.findByPk(req.params.id, {
      include: [Video],
    });
    if (!favouriteList) {
      return res.status(404).json({
        message: `Cannot find the favouriteList with the ${req.params.id} id`,
      });
    }
    res.status(200).json(favouriteList);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.patch("/:id", validateFavouriteListBody, async (req, res) => {
  let currentFavouriteList = await verifyFavouriteListExistance(
    req.params.id,
    res
  );

  try {
    currentFavouriteList.set({
      ...currentFavouriteList,
      description: req.body.description,
      date: req.body.date,
    });

    const newFavouriteList = await currentFavouriteList.save();
    res.status(200).json(newFavouriteList);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    let currentFavouriteList = await verifyFavouriteListExistance(
      req.params.id,
      res
    );
    await currentFavouriteList.destroy();
    res.json({ message: "FavouriteList has been deleted " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
