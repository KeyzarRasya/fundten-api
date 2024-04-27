const express = require('express');
const {signup, login, makeOffering} = require('../controller/umkm');
const {isLoggedIn} = require('../middleware/cookie');
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

const upload = multer({storage}).single('files');

router.post("/signup", signup);
router.post("/login", login);
router.post("/offering",isLoggedIn, upload, makeOffering);
router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.send("oke")
})

module.exports = router;