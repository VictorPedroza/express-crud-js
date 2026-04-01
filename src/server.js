require("module-alias/register");

const app = require("@app/app");
const { env } = require("@config/env");
const { database } = require("@config/database");

// * Função para Inicializar o Servidor
async function startServer() {
  // TODO: Inicializar o conexão com Banco de Dados
  const dbConnection = await database.connect();

  const startTime = new Date().toLocaleString();
  const isProd = env.environment === "production";

  const baseLog = `
=========================================
    ✅ API Status: ONLINE
-----------------------------------------
  🌐 Environment: ${env.environment}
  📡 Port: ${env.port}
  🕒 Started At: ${startTime}
-----------------------------------------
  🛜  Database Connection: ${dbConnection.success ? "✅ SUCCESS" : "❌ FAILED"}
  ${!isProd && dbConnection.message ? `📝 DB Message: ${dbConnection.message}` : ""}
  ${(!isProd || !dbConnection.success) && dbConnection.error ? `❌ Error: ${dbConnection.error}` : ""}

=========================================
    `;

  // * Inicializa o Servidor
  app.listen(env.port, () => {
    console.log(baseLog);
  });
}

startServer();
