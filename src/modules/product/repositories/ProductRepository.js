const { BaseRepository } = require("@app/repositories")

/**
 * BaseRepository - Classe base para repositórios de dados.
 *
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-04-03
 * @version 1.0.0
 * 
 * @param {Object} model - Modelo da entidade que define a estrutura da tabela
 * @param {Object} database - Conexão/instância do banco de dados
 *
 **/
class ProductRepository extends BaseRepository {
    constructor(model, database){
        super(model, database);
    }
};

module.exports = ProductRepository;