const mysql = require("mysql2/promise");
const { env } = require("@config/env");

class Database {
  constructor() {
    this.promisePool = null;
  }

  async connect() {
    if (
      env.database.host &&
      env.database.port &&
      env.database.user &&
      env.database.password &&
      env.database.name
    ) {
      console.log("Connecting to the database...");
    }

    try {
      this.promisePool = mysql.createPool({
        host: env.database.host,
        port: env.database.port,
        user: env.database.user,
        password: env.database.password,
        database: env.database.name,
      });

      await this.promisePool.getConnection();

      return {
        success: true,
        message: "Database connected successfully.",
      };
    } catch (err) {
      return {
        success: false,
        message: "Failed connect to database.",
        error: err.message,
      };
    }
  }
}

module.exports = Database;