const mysql = require("mysql2/promise");
const { env } = require("@config/env");

class Database {
  constructor() {
    this.promisePool = null;
  }

  async connect() {
    // Validação para evitar múltiplas conexões
    if (this.promisePool) {
      return {
        success: true,
        message: "Database already connected.",
      }
    }

    // Validação de variáveis de ambiente
    if (
      !env.database.host ||
      !env.database.port ||
      !env.database.user ||
      !env.database.password ||
      !env.database.name
    ) {
      throw new Error("Missing database configuration.");
    }

    // Tenta criar a conexão e testar
    try {
      // Define o pool de conexões
      this.promisePool = mysql.createPool({
        host: env.database.host,
        port: env.database.port,
        user: env.database.user,
        password: env.database.password,
        database: env.database.name,
        // Configurações adicionais
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0,
        connectTimeout: 10000,
      });

      // Testa a conexão
      const connection = await this.promisePool.getConnection();
      connection.release();

      // Retorna sucesso
      return {
        success: true,
        message: "Database connected successfully.",
      };
    } catch (err) {
      // Verifica o ambiente para 
      const isProd = env.environment === "production";

      // Retorna erro. (Sem detalhes em produção)
      return {
        success: false,
        message: "Failed to connect to database.",
        error: isProd ? undefined : err.message,
      };
    }
  }
}

module.exports = Database;
