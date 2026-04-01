const Database = require("./db.config");

// Define a instância do Database
const database = new Database();

// Exporta a instância para uso em outras partes da aplicação
module.exports = { database };