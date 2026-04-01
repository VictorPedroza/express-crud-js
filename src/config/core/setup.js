require("dotenv").config({ quiet: true })

const express = require("express");
const router = express.Router();

// * Configurações base da aplicação
router.use(express.json());
router.use(express.urlencoded({ extended: true }))

module.exports = router;
