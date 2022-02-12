function isUrl(s) {
  var regexp =
    /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return regexp.test(s);
}

module.exports = function (req, res, next) {
  if (!req.body.description || req.body.description.length < 5) {
    return res.status(400).json({
      message: "Description is missing or shorter than 5 characters",
    });
  }
  if (!req.body.title || req.body.description.title < 5) {
    return res.status(400).json({
      message: "Title is missing or shorter than 5 characters",
    });
  }

  if (!isUrl(req.body.url)) {
    return res.status(400).json({ message: "Invalid URL" });
  }

  next();
};
