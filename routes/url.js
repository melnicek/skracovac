const express = require("express");
const router = express.Router();
const validUrl = require("valid-url");
const shortId = require("shortid");
const config = require("config");

const Url = require("../models/url.model");

// @route POST /api/url
// @desc  Create short url
router.post("/", async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get("baseURL");

  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json("Invalid base URL");
  }

  const urlCode = shortId.generate();

  if (validUrl.isUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        res.json(url);
      } else {
        const shortUrl = baseUrl + "/" + urlCode;

        url = new Url({
          longUrl,
          shortUrl,
          urlCode,
          date: new Date()
        });

        await url.save();

        res.json(url);
      }
    } catch (err) {
      console.log("Error while checking if url already exists");
      res.status(500).json("Server error");
    }
  } else {
    res.status(401).json("Supplied string isn't URL");
  }
});

module.exports = router;