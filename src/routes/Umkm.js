const express = require('express');
const {signup, login, makeOffering} = require('../controller/umkm');
const {isLoggedIn, isAlreadyOffering} = require('../middleware/cookie');
const multer = require('multer');
const path = require('path')

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "uploads/")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({storage});

router.post("/signup", signup);
router.post("/login", login);
router.post("/offering", isLoggedIn, isAlreadyOffering, upload.single('files'), makeOffering);

module.exports = router;