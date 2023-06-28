const express = require('express');
const {generateNewShortURL , getShortUrls ,updateClicks, searchNote} = require("../controller/url");

const router = express.Router();


router.get("/",getShortUrls)
router.post("/create", generateNewShortURL);
router.put("/:shortId",updateClicks)
router.post("/search",searchNote)

module.exports = router;
