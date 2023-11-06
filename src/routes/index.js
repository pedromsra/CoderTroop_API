const {Router} = require("express");

const userRoutes = require("./users.routes")
const noteRoutes = require("./notes.routes")
const sessionsRoutes = require("./sessions.routes")

const routes = Router()

routes.use("/users", userRoutes)
routes.use("/tasks", noteRoutes)
routes.use("/sessions", sessionsRoutes)

module.exports = routes;