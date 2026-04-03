/**
 * BaseRepository - Classe base para repositórios de dados.
 *
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-04-03
 * @version 1.0.0
 *
 **/
class BaseRepository {
  constructor(model, database) {
    this.model = model;
    this.table = model.tableName;
    this.database = database;
  }

  /**
   * findAll - Método para buscar todos os registros da tabela.
   *
   * @async
   * @method findAll
   *
   * @returns {Promise<{success: boolean, data?: any[], error?: string}>} Retorna um objeto indicando o sucesso da operação, os dados encontrados ou uma mensagem de erro.
   *
   * @example
   * const userRepository = new BaseRepository(UserModel, database);
   * const result = await userRepository.findAll();
   * if (result.success) {
   *   console.log(result.data);
   * } else {
   *   console.error(result.error);
   * }
   **/
  async findAll() {
    try {
      // Executa a query para buscar todos os registros da tabela
      const [result] = await this.database.query(
        `SELECT * FROM \`${this.table}\``,
      );

      // Verifica se o resultado é vazio e retorna uma resposta adequada
      if (!result.length) {
        return { success: true, data: [] };
      }

      // Retorna os dados encontrados
      return { success: true, data: result };
    } catch (err) {
      console.error(`[${this.table} Repository] Error in findAll:`, err);
      return { success: false, error: "Failed to find all." };
    }
  }

  /**
   * findById - Método para buscar um registro por ID.
   *
   * @async
   * @method findById
   *
   * @param {number} id - O ID do registro a ser buscado.
   *
   * @returns {Promise<{success: boolean, data?: any, error?: string}>} Retorna um objeto indicando o sucesso da operação, o registro encontrado ou uma mensagem de erro.
   *
   * @example
   * const userRepository = new BaseRepository(UserModel, database);
   * const result = await userRepository.findById(1);
   * if (result.success) {
   *  console.log(result.data);
   * } else {
   *  console.error(result.error);
   * }
   *
   **/
  async findById(id) {
    try {
      const [result] = await this.database.query(
        `SELECT * FROM \`${this.table}\` WHERE id = ?`,
        [id],
      );
      return { success: true, data: result[0] };
    } catch (err) {
      console.error(`[${this.table} Repository] Error in findById:`, err);
      return { success: false, error: "Failed to find by ID." };
    }
  }

  /**
   * create - Método para criar um novo registro.
   *
   * @async
   * @method create
   *
   * @param {Object} data - Os dados do novo registro a ser criado.
   *
   * @returns {Promise<{success: boolean, data?: any, error?: string}>} Retorna um objeto indicando o sucesso da operação, os dados do registro criado ou uma mensagem de erro.
   *
   * @example
   * const userRepository = new BaseRepository(UserModel, database);
   * const newUser = { name: "John Doe", email: "teste@teste.com" };
   * const result = await userRepository.create(newUser);
   * if (result.success) {
   *  console.log(result.data);
   * } else {
   *  console.error(result.error);
   * }
   *
   **/
  async create(data) {
    try {
      // Colunas da Tabela
      const columns = Object.keys(data)
        .map((key) => `\`${key}\``)
        .join(", ");

      // Placeholders para os valores
      const placeholders = Object.keys(data)
        .map(() => "?")
        .join(", ");

      // Valores a serem inseridos
      const values = Object.values(data);

      // Executa a query de inserção
      const [result] = await this.database.query(
        `INSERT INTO \`${this.table}\` (${columns}) 
        VALUES (${placeholders})`,
        values,
      );

      // Retorna o resultado da inserção
      return { success: true, data: result };
    } catch (err) {
      console.error(`[${this.table} Repository] Error in create:`, err);
      return { success: false, error: "Failed to create." };
    }
  }

  /**
   * update - Método para atualizar um registro existente.
   *
   * @async
   * @method update
   *
   * @param {number} id - O ID do registro a ser atualizado.
   * @param {Object} data - Os dados a serem atualizados no registro.
   *
   * @return {Promise<{success: boolean, data?: any, error?: string}>} Retorna um objeto indicando o sucesso da operação, os dados do registro atualizado ou uma mensagem de erro.
   *
   * @example
   * const userRepository = new BaseRepository(UserModel, database);
   * const updatedData = { name: "Jane Doe", email: "teste@teste.com" };
   * const result = await userRepository.update(1, updatedData);
   * if (result.success) {
   *  console.log(result.data);
   * } else {
   *  console.error(result.error);
   * }
   *
   **/
  async update(id, data) {
    try {
      // Executa a query de atualização
      const [result] = await this.database.query(
        `UPDATE \`${this.table}\` SET ? WHERE id = ?`,
        [data, id],
      );

      if (result.affectedRows === 0) {
        return { success: false, error: "Not found." };
      }

      // Retorna o resultado da atualização
      return { success: true, data: result };
    } catch (err) {
      console.error(`[${this.table} Repository] Error in update:`, err);
      return { success: false, error: "Failed to update." };
    }
  }

  /**
   * delete - Método para deletar um registro por ID.
   *
   * @async
   * @method delete
   *
   * @param {number} id - O ID do registro a ser deletado.
   *
   * @return {Promise<{success: boolean, data?: any, error?: string}>} Retorna um objeto indicando o sucesso da operação, os dados do registro deletado ou uma mensagem de erro.
   *
   * @example
   * const userRepository = new BaseRepository(UserModel, database);
   * const result = await userRepository.delete(1);
   * if (result.success) {
   *  console.log(result.data);
   * } else {
   *  console.error(result.error);
   * }
   *
   **/
  async delete(id) {
    try {
      const [result] = await this.database.query(
        `DELETE FROM \`${this.table}\` WHERE id = ?`,
        [id],
      );

      if (result.affectedRows === 0) {
        return { success: false, error: "Not found." };
      }

      return { success: true, data: result };
    } catch (err) {
      console.error(`[${this.table} Repository] Error in delete:`, err);
      return { success: false, error: "Failed to delete." };
    }
  }
}

module.exports = BaseRepository;
