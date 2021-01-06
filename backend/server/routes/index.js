//adding comment in index
//new head comment in feature3
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json({ url: "/" });
});

module.exports = router;
//new end comment for index
