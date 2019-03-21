const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");

const usersRouter = require("./users/users-router.js");
const postsRouter = require("./posts/posts-router.js");

const server = express();

// MIDDLEWARE
server.use(helmet());
server.use(express.json());
server.use(morgan("short"));

server.use("/api/users", usersRouter);
server.use("/api/posts", postsRouter);

server.get('/', (req, res) => {
  res.send(`Data is on /api/users & /api/posts`);
});


module.exports = server;

