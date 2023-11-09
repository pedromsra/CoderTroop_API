const { Router, response } = require('express');

const UsersController = require("../controllers/UsersController");
const ensureAuthenticated = require("../middleware/ensureAuthenticated")

const userRoutes = Router();

const usersController = new UsersController();

userRoutes.post("/" , usersController.create);

module.exports = userRoutes;