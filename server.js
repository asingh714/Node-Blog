const express = require("express"); 
const helmet = require("helmet");
const morgan = require("morgan");

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(morgan("short"));

module.exports = server;