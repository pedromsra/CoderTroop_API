const knex = require("../database/knex");
const AppError = require("../utils/AppError");

class NotesController{

    async create (request, response) {
        const { task, priority } = request.body;
        
        if (!task) {
            throw new AppError("A tarefa deve ter algum conteúdo");
        }

        if (!priority && priority !== 0) {
            throw new AppError("A tarefa deve ter alguma prioridade");
        }

        const user_id = request.user.id;

        await knex("tasks").insert({
            task,
            priority,
            user_id
        });

        return response.json();
    }
    
    async update (request, response) {
        const { task, priority, done } = request.body;

        const {id} = request.params;

        if (!task) {
            throw new AppError("A tarefa deve ter algum conteúdo");
        }
        
        if (!priority && priority !== 0) {
            throw new AppError("A tarefa deve ter alguma prioridade");
        }
        
        let doneUpdate
        if (done === true || done === 1) {
            process.env.NODE_ENV ? doneUpdate = true : doneUpdate = 1
        } else if (done === false || done === 0) {
            process.env.NODE_ENV ? doneUpdate = false : doneUpdate = 0
        }
        
        await knex("tasks").where({id: id}).update({
            task,
            priority,
            done: doneUpdate,
            updated_at: new Date().toISOString().replace('Z','').replace('T', ' ')
        });
        
        return response.status(201).json();
    }

    async delete(request, response) {
        const {id} = request.params;
        
        await knex("tasks").where({id}).delete();

        return response.status(201).json()
    }

    async index(request, response) {        
        const user_id = request.user.id;
        
        const tasks = await knex("tasks")
            .where({user_id})
            .orderBy("priority", "desc")


        return response.status(201).json(tasks)
    }

}

module.exports = NotesController;