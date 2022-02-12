const express = require("express");
const router = express.Router();
const Video = require("../models").VideoTable;
const validateVideoBody = require("../middleware/validateVideoBody");

router.post("/", validateVideoBody, async (req, res) => {
  const video = Video.build({
    description: req.body.description,
    title: req.body.title,
    url: req.body.url,
    favouriteListId: req.body.favouriteListId,
  });

  try {
    // save the video into the database
    const newVideo = await video.save();
    //created
    return res.status(201).json(newVideo);
  } catch (error) {
    //bad request
    res.status(400).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const videos = await Video.findAll();
    return res.status(200).json(videos);
  } catch (error) {
    //internal server error
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const video = await Video.findByPk(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Cannot find video" });
    }
    res.status(200).json(video);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
});

router.patch("/:id", async (req, res) => {
  try {
    const currentVideo = await Video.findByPk(req.params.id);
    if (!currentVideo) {
      return res.status(404).json({ message: "Cannot find video" });
    }

    currentVideo.set({
      ...currentVideo,
      description: req.body.description,
      title: req.body.title,
      url: req.body.url,
      favouriteListId: req.body.favouriteListId,
    });

    const newVideo = await currentVideo.save();
    return res.status(200).json(newVideo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

//DELETE a video
router.delete("/:id", async (req, res) => {
  try {
    const currentVideo = await Video.findByPk(req.params.id);
    if (!currentVideo) {
      return res.status(404).json({ message: "Cannot find video" });
    }
    await currentVideo.destroy();
    return res.json({ message: "Video deleted " });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
