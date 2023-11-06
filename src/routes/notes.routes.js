const {Router} = require('express');
const ensureAuthenticated = require("../middleware/ensureAuthenticated")


const NotesController = require("../controllers/NotesController");

const notesRoutes = Router();

const notesController = new NotesController();

notesRoutes.use(ensureAuthenticated) //APLICANDO O MIDDLEWARE PARA TODAS AS ROTAS

notesRoutes.post('/', notesController.create);
notesRoutes.put('/:id', notesController.update);
notesRoutes.delete('/:id', notesController.delete);
notesRoutes.get('/', notesController.index);

module.exports = notesRoutes;