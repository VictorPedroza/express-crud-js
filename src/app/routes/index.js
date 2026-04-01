const express = require("express");
const router = express.Router();

// TODO: Adicionar as rotas da aplicação aqui
router.get("/", (req, res) => {
    return res.send("Hello World! The API RESTful is running successfully");
})

module.exports = router;