const express = require("express");
const router = express.Router();
var request = require('request');

const Url = require("../models/url.model");
const Click = require("../models/click.model");

// @route GET /:shortUrl
// @desc  Redirect to orig url
router.get("/:shortUrl", async (req, res) => {
  try {
    const url = await Url.findOne({ urlCode: req.params.shortUrl });

    if (url) {
      request('http://ip-api.com/json/' + (req.header('x-forwarded-for') || req.connection.remoteAddress), function (error, response, body) {
        if (!error && response.statusCode == 200) {
          const info = JSON.parse(body);
          console.log(info);
          let click = new Click({
            urlCode: url.urlCode,
            date: new Date(),
            ip: req.header('x-forwarded-for') || req.connection.remoteAddress,
            userAgent: req.headers['user-agent'],
            city: info.city,
            country: info.country,
          })
          click.save();
        }
      });


      return res.redirect(url.longUrl);
    } else {
      return res.status(404).json("Url not found");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json("Server error");
  }
});

module.exports = router;