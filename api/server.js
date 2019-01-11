const express = require("express");


const usersRouter = require("../users/usersRouter");
const postsRouter = require("../posts/postsRouter");

const server = express();

// MIDDLEWARE
server.use(express.json());

// ROUTES
server.use("/users", usersRouter)
server.use("/posts", postsRouter)


// Display Hello to homepage.
server.get("/", (req, res) => {
  res.send("Hello.");
});



module.exports = server;