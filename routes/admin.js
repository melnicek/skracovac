const express = require("express");
const router = express.Router();

const Url = require("../models/url.model");
const Click = require("../models/click.model");

// @route GET /admin
// @desc  Admin panel
router.get("/add", async (req, res) => {
  return res.render("url.add.ejs");
});

router.get("/list", async (req, res) => {
  Url.find({}, function (err, urls) {
    return res.render("url.list.ejs", { urls: urls });
  });
});

router.get("/list/:id", async (req, res) => {
  Click.find({urlCode:req.params.id}, function (err, clicks) {
    return res.render("click.list.ejs", { clicks: clicks });
  });
});

module.exports = router;