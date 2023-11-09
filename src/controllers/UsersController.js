const { hash, compare } = require('bcryptjs'); //para criptografia de senhas

const AppError = require("../utils/AppError"); //para exibir mensagens de erro (ex: email já cadastrado)

const knex = require("../database/knex"); //para se conectar com as insformações do banco de dados

class UsersController {
    async create(request, response) {

        const { name, email, password } = request.body;

        let checkUserExist
        try {
            checkUserExist = await knex("users").where({ email }).first();
        } catch (e) {
            throw new AppError(e)
        }
        if (checkUserExist) {
            throw new AppError("Email já cadastrado");
        }

        const hashedPassword = await hash(password, 8);

        let user_id

        try {
            user_id = await knex("users").insert({
                name,
                email,
                password: hashedPassword
            })
        } catch (e) {
            throw new AppError(e)
        }

        return response.json({ name, email, password })
    }
}

module.exports = UsersController