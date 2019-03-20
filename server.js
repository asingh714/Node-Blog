const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const usersRouter = require("./users/users-router.js");

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(morgan("short"));

server.use("/api/users", usersRouter);

module.exports = server;
