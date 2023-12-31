require("dotenv/config");
require("express-async-errors");

const AppError = require("./utils/AppError");
const cors = require("cors"); //para que o backend possa atender as requsiçãoes do front end

const express = require("express");

const routes = require("./routes"); //routes

const app = express();

app.use(cors());

app.use(express.json());

app.use(routes) //routes

app.use(( error, request, response, next ) => {
    if(error instanceof AppError){
        return response.status(error.statusCode).json({
            status: "error",
            message: error.message
        });
    };

    return response.status(500).json({
        status: "error",
        message: "Internal server error"
    })

});

const PORT = process.env.PORT || 3003;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));