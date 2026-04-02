const mysql = require("mysql2/promise");
const { env } = require("@config/env");

/**
 * Database - Class responsável por gerenciar a conexão com o Banco de Dados
 *
 * @class
 *
 * @author Vicor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-04-01
 * @version 1.0.0
 **/
class Database {
  constructor() {
    this.promisePool = null;
  }

  /**
   * connect - Método para realizar a conexão com o Banco de Dados
   *
   * @async
   * @method connect
   *
   * @returns {Promise<{success: boolean, message: string, error?: string}>} Resultado da conexão
   *
   * @example
   * const connection = await database.connect();
   * if (connection.success) {
   *  console.log(connection.message);
   * } else {
   *  console.error(connection.error || connection.message);
   * }
   *
   * **/
  async connect() {
    // Validação para evitar múltiplas conexões
    if (this.promisePool) {
      return {
        success: true,
        message: "Database already connected.",
      };
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
      console.error("[Database Connection Error]", err);

      // Retorna erro. (Sem detalhes em produção)
      return {
        success: false,
        message: "Failed to connect to database.",
        error: isProd ? undefined : err.message,
      };
    }
  }

  /**
   * query - Método para executar uma query no Banco de Dados
   *
   * @async
   * @method query
   *
   * @param {string} sql - A query SQL a ser executada
   * @param {Array} params - Os parâmetros para a query (opcional)
   *
   * @return {Promise<{success: boolean, data?: any, message?: string, error?: string}>} Resultado da execução da query
   *
   * @example
   * const result = await database.query("SELECT * FROM users WHERE id = ?", [userId]);
   * if (result.success) {
   *  console.log(result.data);
   * } else {
   *  console.error(result.error);
   * }
   *
   * **/
  async query(query, params) {
    // Inicializa a conexão se ainda não estiver conectada
    if (!this.promisePool) {
      await this.connect();
    }
    let connection;

    // Tenta executar a query e retorna o resultado ou erro
    try {
      // Obtém uma conexão do pool
      connection = await this.promisePool.getConnection();

      // Executa a query com os parâmetros fornecidos
      const [result] = await connection.execute(query, params);
      // Retorna o resultado da query
      return {
        success: true,
        data: result,
      };
    } catch (err) {
      // Verifica o ambiente
      const isProd = env.environment === "production";
      // Loga o erro no console (com detalhes) e retorna uma mensagem genérica para produção
      console.error(`[Database Query Error]: ${err.message}`, { sql, params });

      // Retorna o erro. (Sem detalhes em produção)
      return {
        success: false,
        message: "Database query failed.",
        error: isProd ? undefined : err.message,
      };
    } finally {
      // Garante que a conexão seja liberada
      if (connection) connection.release();
    }
  }

  // TODO: Implementar método de teste de conexão
  // TODO: Implementar método de fechamento de conexão
}

module.exports = Database;
