module.exports = function (req, res, next) {
  if (!req.body.description || req.body.description.length < 3) {
    return res.status(400).json({
      message: "Description is shorter than 3 characters",
    });
  }

  try {
    const date = new Date(req.body.date).toISOString();
    if (!req.body.date || date < new Date().toISOString()) {
      return res
        .status(400)
        .json({ message: "Date is missing or it is in the past" });
    }
  } catch (e) {
    return res.status(400).json({ message: "Invalid date format" });
  }

  next();
};
