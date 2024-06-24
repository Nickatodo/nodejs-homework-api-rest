const express = require("express");

const appRouter = express.Router();

const userRouter = require("./users");
const contactRouter = require("./contacts");

appRouter.use("/users", userRouter);
appRouter.use("/contacts", contactRouter);

module.exports = appRouter;
