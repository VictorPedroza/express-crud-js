const app = require("./app/app");

function startServer() {
    const baseLog = `
======================================
    ✅ API is Running Successfully
--------------------------------------

======================================
    `

    // Inicializa o Servidor
    app.listen(8000, () => {
        console.log(baseLog);
    })
}

startServer();