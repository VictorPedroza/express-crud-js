require('module-alias/register');

const app = require("@app/app");
const { env } = require("@config/env");

function startServer() {

    const baseLog = `
======================================
    ✅ API Status: ONLINE
--------------------------------------
    🌐 Environment: ${env.enviroment}
    📡 Port: ${env.port}

======================================
    `

    // Inicializa o Servidor
    app.listen(env.port, () => {
        console.log(baseLog);
    })
}

startServer();