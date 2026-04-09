const { BaseRepository } = require("@app/repositories")

/**
 * BaseRepository - Classe base para repositórios de dados.
 *
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-04-03
 * @version 1.1.0
 * 
 * @param {Object} model - Modelo da entidade que define a estrutura da tabela
 * @param {Object} database - Conexão/instância do banco de dados
 *
 **/
class ProductRepository extends BaseRepository {
    constructor(model, database){
        super(model, database);
    }

    async findByName(name) {
        try {
            
        const [result] = await this.database.query(
            `SELECT * FROM \`${this.table}\` WHERE name = ? LIMIT 1`,
            [name]
        );

        return { success: true, data: result[0] || null };
        } catch (err) {
            console.error(`[${this.table} Repository] Error to find by name:`, err);
            return { success: false, error: "Error to find by name" }
        }
    }
};

module.exports = ProductRepository;