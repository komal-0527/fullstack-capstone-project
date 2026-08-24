const express = require("express");

const router = express.Router();

const { getAllGifts, getGiftById } = require("../controllers/giftController");

router.get("/", getAllGifts);

router.get("/:id", getGiftById);

module.exports = router;
