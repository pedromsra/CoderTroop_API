const {hash, compare} = require('bcryptjs'); //para criptografia de senhas

const AppError = require("../utils/AppError"); //para exibir mensagens de erro (ex: email já cadastrado)

const knex = require("../database/knex"); //para se conectar com as insformações do banco de dados

class UsersController {
    async create(request, response) {
        
        const {name, email, password} = request.body;

        const checkUserExist = await knex("users").where({email}).first();
        if(checkUserExist){
            throw new AppError("Email já cadastrado");
        }

        const hashedPassword = await hash(password, 8);

        let user_id

        try{
            user_id = await knex("users").insert({
                name,
                email,
                password: hashedPassword
            })
        } catch (e) {
            throw new AppError(e)
        } finally {
            knex.destroy()
        }

        return response.json({name, email, password})
    }

    async update(request, response) {
        const {name, email, password, oldPassword} = request.body

        const user_id = request.user.id

        //checar se o novo email já existe em algum outro usuário
        let user

        try {
            user = await knex('users').where({id: user_id}).first()
        } catch (e) {
            throw new AppError(e)
        } finally {
            knex.destroy()
        }

        if (!user) {
            throw new AppError("Usuário não encontrado")
        }
        
        
        const checkEmail = await knex("users").where({email}).first() //só retorna 1
        if(checkEmail && checkEmail.id !== user.id) {
            throw new AppError("Email já cadastrado por outro usuário")
        }

        
        user.name = name ?? user.name //email é igual ao novo name, mas se não tiver sido informado um novo name, deixar igual ao valor antigo
        user.email = email ?? user.email //email é igual ao novo email, mas se não tiver sido informado um novo email, deixar igual ao valor antigo
        
        //checar se a oldPassword confere, se não, retornar erro

        if(password && !oldPassword){
            throw new AppError("Você precisa informar a senha antiga")
        }


        if(password && oldPassword){
            const checkOldPassword = await compare(oldPassword, user.password);
            if (!checkOldPassword){
                throw new AppError("A sua senha antiga não confere com a senha informada")
            }

            user.password = await hash(password, 8)
        }

        try{
            await knex("users")
            .where({id: user_id})
            .update({
                name: user.name,
                email: user.email,
                password: user.password,
                updated_at: new Date().toISOString().replace('Z','').replace('T', ' ')
            })
        } catch (e) {
            throw new AppError(e)
        } finally {
            knex.destroy()
        }


        return response.status(201).json()
    }

    async delete(request, response) {
        const user_id = request.user.id

        try{
            await knex("users").where({id}).delete()
        } catch (e) {
            throw new AppError(e)
        } finally {
            knex.destroy()
        }

        return response.status(201).json();
    }
}

module.exports = UsersController