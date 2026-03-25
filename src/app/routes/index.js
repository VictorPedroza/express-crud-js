const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    return res.send("Hello World! The API RESTful is running successfully");
})

module.exports = router;