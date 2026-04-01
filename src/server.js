require('module-alias/register');

const app = require("@app/app");
const { env } = require("@config/env");

// * Função para Inicializar o Servidor
function startServer() {
    const startTime = new Date().toLocaleString();
    
    const baseLog = `
=========================================
    ✅ API Status: ONLINE
-----------------------------------------
    🌐 Environment: ${env.enviroment}
    📡 Port: ${env.port}
    🕒 Started At: ${startTime}

=========================================
    `

    // * Inicializa o Servidor
    app.listen(env.port, () => {
        console.log(baseLog);
    })
}

startServer();