import express from "express";
import compression from "compression";  // compresses requests
import bodyParser from "body-parser";
import lusca from "lusca";
import mongoose from "mongoose";
import bluebird from "bluebird";
import { MONGODB_URI } from "./util/secrets";

import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "./swagger/swagger.json";

// Controllers (route handlers)
import * as userController from "./controllers/user";
import * as hobbyController from "./controllers/hobby";

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;

mongoose.connect(mongoUrl, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }).then(
    () => { /** ready to use. The `mongoose.connect()` promise resolves to undefined. */ },
).catch(err => {
    console.log("MongoDB connection error. Please make sure MongoDB is running. " + err);
    // process.exit();
});

// Express configuration
app.set("port", process.env.PORT || 3000);
app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(lusca.xframe("SAMEORIGIN"));
app.use(lusca.xssProtection(true));


/**
 * User routes.
 */
app.get("/users", userController.getUsers);
app.post("/user", userController.addUser);

/**
 * Hobby routes.
 */
app.get("/hobbies/:id", hobbyController.getHobbies);
app.post("/hobby/:id", hobbyController.addHobby);
app.delete("/hobby/:id", hobbyController.deleteHobby);



app.use("/swagger", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


export default app;
