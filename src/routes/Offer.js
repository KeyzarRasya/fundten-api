const express = require('express')
const {offerList, deletingOffer} = require('../controller/offer')

const router = express.Router();

router.get("/list", offerList);
router.post("/delete/:offerId", deletingOffer);

module.exports = router